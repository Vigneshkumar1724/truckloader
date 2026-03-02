import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Grid, Card, CardContent, Chip, Button,
    Divider, Avatar, Rating, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Alert, Skeleton,
} from '@mui/material';
import {
    LocalShipping, LocationOn, ArrowBack, CheckCircle, Phone, Email, ContactPhone,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { trucksAPI } from '../services/api';
import { getTruckById, getTransporterById, getTruckTypeLabel } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function TruckDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [truck, setTruck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [contactOpen, setContactOpen] = useState(false);
    const [contacted, setContacted] = useState(false);

    useEffect(() => {
        const fetchTruck = async () => {
            setLoading(true);
            try {
                const data = await trucksAPI.getById(id);
                setTruck(data);
            } catch {
                setTruck(getTruckById(id) || null);
            } finally {
                setLoading(false);
            }
        };
        fetchTruck();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="rounded" height={300} sx={{ mb: 3 }} />
                <Skeleton variant="rounded" height={200} />
            </Container>
        );
    }

    if (!truck) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Truck not found</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/trucks')}>Back to Marketplace</Button>
            </Container>
        );
    }

    const owner = truck.owner && typeof truck.owner === 'object' ? truck.owner : getTransporterById(truck.owner);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate('/trucks')} sx={{ mb: 2 }}>Back</Button>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ mb: 3 }}>
                            <CardContent sx={{ p: 4 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <LocalShipping color="primary" sx={{ fontSize: 32 }} />
                                        <Typography variant="h5" fontWeight={700}>{truck.make} {truck.model}</Typography>
                                    </Box>
                                    <Chip label={truck.isAvailable ? 'Available' : 'On Trip'} color={truck.isAvailable ? 'success' : 'default'} sx={{ fontWeight: 600 }} />
                                </Box>

                                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 600, mb: 2, fontSize: '1.1rem' }}>
                                    🚛 {truck.registrationNo}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Grid container spacing={3}>
                                    {[
                                        ['Type', getTruckTypeLabel(truck.type)],
                                        ['Capacity', `${truck.capacity} Ton`],
                                        ['Current City', truck.currentCity],
                                        ['Trips Completed', truck.tripsCompleted],
                                    ].map(([label, value], i) => (
                                        <Grid size={{ xs: 6, sm: 3 }} key={i}>
                                            <Typography variant="caption" color="text.secondary">{label}</Typography>
                                            <Typography variant="body1" fontWeight={600}>{value}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>

                                {truck.availableRoutes?.length > 0 && (
                                    <Box sx={{ mt: 3 }}>
                                        <Typography variant="caption" color="text.secondary">Available Routes</Typography>
                                        <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                            {truck.availableRoutes.map(r => <Chip key={r} label={r} size="small" variant="outlined" color="primary" />)}
                                        </Box>
                                    </Box>
                                )}

                                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Rating value={truck.rating || 0} precision={0.1} readOnly />
                                    <Typography fontWeight={600}>{truck.rating}</Typography>
                                </Box>

                                {truck.isAvailable && (
                                    <Button variant="contained" color="secondary" size="large" startIcon={<ContactPhone />} onClick={() => setContactOpen(true)} sx={{ mt: 3 }}>
                                        Contact Owner
                                    </Button>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        {owner && (
                            <Card>
                                <CardContent sx={{ p: 3 }}>
                                    <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 2 }}>Truck Owner</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }}
                                        onClick={() => navigate(`/profile/${owner._id || owner.id}`)}
                                    >
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>{owner.name?.[0]}</Avatar>
                                        <Box>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                <Typography fontWeight={700}>{owner.name}</Typography>
                                                {owner.verified && <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary">{owner.companyName}</Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 2 }} />
                                    {owner.phone && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                            <Phone fontSize="small" color="action" />
                                            <Typography variant="body2">{owner.phone}</Typography>
                                        </Box>
                                    )}
                                    {owner.email && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email fontSize="small" color="action" />
                                            <Typography variant="body2">{owner.email}</Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </Grid>
                </Grid>

                <Dialog open={contactOpen} onClose={() => { setContactOpen(false); setContacted(false); }} maxWidth="sm" fullWidth>
                    <DialogTitle>Contact Truck Owner</DialogTitle>
                    <DialogContent>
                        {contacted ? (
                            <Alert severity="success" sx={{ mt: 1 }}>Message sent! The owner will contact you shortly.</Alert>
                        ) : (
                            <Box sx={{ pt: 1 }}>
                                <TextField label="Your Name" fullWidth sx={{ mb: 2 }} defaultValue="Vicky" />
                                <TextField label="Phone Number" fullWidth sx={{ mb: 2 }} placeholder="+91..." />
                                <TextField label="Message" multiline rows={3} fullWidth placeholder="I need your truck for..." />
                            </Box>
                        )}
                    </DialogContent>
                    {!contacted && (
                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={() => setContactOpen(false)}>Cancel</Button>
                            <Button variant="contained" color="secondary" onClick={() => setContacted(true)}>Send Message</Button>
                        </DialogActions>
                    )}
                </Dialog>
            </MotionBox>
        </Container>
    );
}
