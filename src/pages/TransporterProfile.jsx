import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container, Typography, Grid, Box, Card, CardContent, Avatar, Chip,
    Rating, Divider, Button, Skeleton,
} from '@mui/material';
import {
    CheckCircle, LocationOn, LocalShipping, Inventory, Star,
    CalendarMonth, ArrowBack, Business, Phone, Email,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import TruckCard from '../components/TruckCard';
import { usersAPI } from '../services/api';
import { getTransporterById, getTrucksByOwner } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function TransporterProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [transporter, setTransporter] = useState(null);
    const [fleet, setFleet] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const user = await usersAPI.getProfile(id);
                setTransporter(user);
                const trucks = await usersAPI.getUserTrucks(id);
                setFleet(trucks);
            } catch {
                const mock = getTransporterById(id);
                setTransporter(mock || null);
                setFleet(getTrucksByOwner(id));
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="rounded" height={200} sx={{ mb: 3 }} />
                <Grid container spacing={2}>{[...Array(4)].map((_, i) => <Grid size={{ xs: 6, md: 3 }} key={i}><Skeleton variant="rounded" height={100} /></Grid>)}</Grid>
            </Container>
        );
    }

    if (!transporter) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5">Transporter not found</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate('/')}>Go Home</Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>

                <Card sx={{ mb: 4, overflow: 'visible' }}>
                    <Box sx={{ height: 120, background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)', borderRadius: '16px 16px 0 0' }} />
                    <CardContent sx={{ pt: 0, px: 4, pb: 4, position: 'relative' }}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: 'secondary.main', fontSize: '2.5rem', fontWeight: 800, border: '4px solid', borderColor: 'background.paper', mt: -6, mb: 2 }}>
                            {transporter.name?.[0]}
                        </Avatar>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                            <Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                    <Typography variant="h4" fontWeight={800}>{transporter.name}</Typography>
                                    {transporter.verified && <Chip icon={<CheckCircle />} label="Verified" color="success" size="small" />}
                                </Box>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{transporter.companyName}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Rating value={transporter.rating || 0} precision={0.1} size="small" readOnly />
                                        <Typography fontWeight={600}>{transporter.rating}</Typography>
                                    </Box>
                                    {transporter.city && <Chip icon={<LocationOn />} label={transporter.city} size="small" variant="outlined" />}
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {transporter.phone && <Button variant="outlined" startIcon={<Phone />}>{transporter.phone}</Button>}
                                {transporter.email && <Button variant="outlined" startIcon={<Email />}>Email</Button>}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    <Grid size={12}>
                        <Grid container spacing={2}>
                            {[
                                { icon: <LocalShipping />, label: 'Fleet Size', value: transporter.fleetSize || fleet.length, color: '#1a237e' },
                                { icon: <Inventory />, label: 'Total Loads', value: transporter.totalLoads || 0, color: '#f57c00' },
                                { icon: <Star />, label: 'Rating', value: transporter.rating || 0, color: '#2e7d32' },
                                { icon: <Business />, label: 'GST', value: transporter.gstNumber ? 'Verified' : 'Not Verified', color: '#d32f2f' },
                            ].map((s, i) => (
                                <Grid size={{ xs: 6, md: 3 }} key={i}>
                                    <Card>
                                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                            <Box sx={{ color: s.color, mb: 1 }}>{s.icon}</Box>
                                            <Typography variant="h5" fontWeight={700}>{s.value}</Typography>
                                            <Typography variant="body2" color="text.secondary">{s.label}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {fleet.length > 0 && (
                        <Grid size={12}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Fleet ({fleet.length} trucks)</Typography>
                            <Grid container spacing={2}>
                                {fleet.map(truck => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={truck._id || truck.id}>
                                        <TruckCard truck={truck} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}

                    {transporter.reviews?.length > 0 && (
                        <Grid size={12}>
                            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Reviews ({transporter.reviews.length})</Typography>
                            <Grid container spacing={2}>
                                {transporter.reviews.map((review, i) => (
                                    <Grid size={{ xs: 12, md: 6 }} key={i}>
                                        <Card>
                                            <CardContent sx={{ p: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                                    <Rating value={review.rating} size="small" readOnly />
                                                </Box>
                                                <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic' }}>"{review.text}"</Typography>
                                                <Typography variant="caption" fontWeight={600}>— {review.by}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </MotionBox>
        </Container>
    );
}
