import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Grid, Card, CardContent, Chip, Button,
    Divider, Avatar, Rating, List, ListItem, ListItemAvatar, ListItemText,
    Skeleton, Alert,
} from '@mui/material';
import {
    LocationOn, ArrowForward, ArrowBack, CheckCircle, Gavel, Phone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import BidDialog from '../components/BidDialog';
import { useApp } from '../context/AppContext';
import { loadsAPI, bidsAPI } from '../services/api';
import { getLoadById, getTransporterById, getTruckTypeLabel, loads as mockLoads } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function LoadDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useApp();
    const [load, setLoad] = useState(null);
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bidOpen, setBidOpen] = useState(false);
    const [bidError, setBidError] = useState('');

    useEffect(() => {
        const fetchLoad = async () => {
            setLoading(true);
            try {
                const data = await loadsAPI.getById(id);
                setLoad(data);
                const bidData = await bidsAPI.getForLoad(id);
                setBids(bidData);
            } catch {
                // Fallback to mock
                const mockLoad = getLoadById(id);
                setLoad(mockLoad || null);
            } finally {
                setLoading(false);
            }
        };
        fetchLoad();
    }, [id]);

    const handleBidSubmit = async ({ amount, message }) => {
        setBidError('');
        try {
            const newBid = await bidsAPI.create({ load: id, amount, message });
            setBids(prev => [newBid, ...prev]);
            setBidOpen(false);
        } catch (err) {
            setBidError(err.message);
        }
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="rounded" height={300} sx={{ mb: 3 }} />
                <Skeleton variant="rounded" height={200} />
            </Container>
        );
    }

    if (!load) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Load not found</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/loads')}>Back to Marketplace</Button>
            </Container>
        );
    }

    const poster = load.postedBy && typeof load.postedBy === 'object' ? load.postedBy : getTransporterById(load.postedBy);
    const statusColor = { open: 'success', assigned: 'warning', completed: 'default' };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate('/loads')} sx={{ mb: 2 }}>Back</Button>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocationOn color="primary" />
                                        <Typography variant="h5" fontWeight={700}>{load.from}</Typography>
                                        <ArrowForward sx={{ mx: 1 }} />
                                        <Typography variant="h5" fontWeight={700}>{load.to}</Typography>
                                    </Box>
                                    <Chip label={load.status} color={statusColor[load.status]} sx={{ textTransform: 'capitalize', fontWeight: 600 }} />
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Grid container spacing={3}>
                                    {[
                                        ['Material', load.material],
                                        ['Weight', `${load.weight} Ton`],
                                        ['Truck Type', getTruckTypeLabel(load.truckType)],
                                        ['Pickup Time', load.pickupTime ? new Date(load.pickupTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : '—'],
                                    ].map(([label, value], i) => (
                                        <Grid size={{ xs: 6, sm: 3 }} key={i}>
                                            <Typography variant="caption" color="text.secondary">{label}</Typography>
                                            <Typography variant="body1" fontWeight={600}>{value}</Typography>
                                        </Grid>
                                    ))}
                                    <Grid size={{ xs: 6, sm: 3 }}>
                                        <Typography variant="caption" color="text.secondary">Expected Price</Typography>
                                        <Typography variant="h6" fontWeight={700} color="secondary.main">₹{load.price?.toLocaleString('en-IN')}</Typography>
                                    </Grid>
                                </Grid>

                                {load.description && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="caption" color="text.secondary">Description</Typography>
                                        <Typography variant="body1" sx={{ mt: 0.5 }}>{load.description}</Typography>
                                    </Box>
                                )}

                                {load.status === 'open' && (
                                    <Box sx={{ mt: 3 }}>
                                        {bidError && <Alert severity="error" sx={{ mb: 2 }}>{bidError}</Alert>}
                                        {isAuthenticated ? (
                                            <Button variant="contained" color="secondary" size="large" startIcon={<Gavel />} onClick={() => setBidOpen(true)}>
                                                Place Bid
                                            </Button>
                                        ) : (
                                            <Button variant="contained" onClick={() => navigate('/auth')}>Login to Bid</Button>
                                        )}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Bids */}
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Bids ({bids.length})</Typography>
                                {bids.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">No bids yet. Be the first!</Typography>
                                ) : (
                                    <List>
                                        {bids.map(bid => {
                                            const bidder = bid.bidder && typeof bid.bidder === 'object' ? bid.bidder : getTransporterById(bid.bidder);
                                            return (
                                                <ListItem key={bid._id || bid.id} sx={{ bgcolor: 'action.hover', borderRadius: 2, mb: 1 }}>
                                                    <ListItemAvatar>
                                                        <Avatar sx={{ bgcolor: 'primary.main' }}>{bidder?.name?.[0] || 'U'}</Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Typography fontWeight={600}>{bidder?.name || 'Unknown'}</Typography>
                                                                {bidder?.verified && <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />}
                                                                <Box sx={{ flexGrow: 1 }} />
                                                                <Typography variant="h6" fontWeight={700} color="secondary.main">
                                                                    ₹{bid.amount?.toLocaleString('en-IN')}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Box>
                                                                <Typography variant="body2" sx={{ mt: 0.5 }}>{bid.message}</Typography>
                                                                <Chip label={bid.status} size="small" sx={{ mt: 1, textTransform: 'capitalize' }}
                                                                    color={bid.status === 'accepted' ? 'success' : bid.status === 'rejected' ? 'error' : 'default'} />
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        {poster && (
                            <Card sx={{ mb: 3 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>Posted By</Typography>
                                    <Box
                                        sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                        onClick={() => navigate(`/profile/${poster._id || poster.id}`)}
                                    >
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>{poster.name?.[0]}</Avatar>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography fontWeight={700}>{poster.name}</Typography>
                                                {poster.verified && <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />}
                                            </Box>
                                            <Rating value={poster.rating || 0} precision={0.1} size="small" readOnly />
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    {poster.phone && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Phone fontSize="small" color="action" />
                                            <Typography variant="body2">{poster.phone}</Typography>
                                        </Box>
                                    )}
                                    {poster.city && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocationOn fontSize="small" color="action" />
                                            <Typography variant="body2">{poster.city}</Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>

                <BidDialog open={bidOpen} onClose={() => setBidOpen(false)} load={load} onSubmit={handleBidSubmit} />
            </MotionBox>
        </Container>
    );
}
