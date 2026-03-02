import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Grid, Box, Card, CardContent, Chip,
    Avatar, LinearProgress, Button, Skeleton,
} from '@mui/material';
import {
    LocalShipping, Inventory, Gavel, TrendingUp, ArrowForward,
    HourglassTop, CheckCircle, Cancel,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { usersAPI } from '../services/api';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useApp();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            if (!isAuthenticated) { setLoading(false); return; }
            try {
                const res = await usersAPI.getDashboard();
                setData(res);
            } catch { /* ignore */ }
            finally { setLoading(false); }
        };
        fetchDashboard();
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Login to view your dashboard</Typography>
                <Button variant="contained" onClick={() => navigate('/auth')}>Login / Register</Button>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Skeleton variant="rounded" height={60} sx={{ mb: 3 }} />
                <Grid container spacing={3}>{[...Array(4)].map((_, i) => <Grid size={{ xs: 6, md: 3 }} key={i}><Skeleton variant="rounded" height={120} /></Grid>)}</Grid>
            </Container>
        );
    }

    const stats = data?.stats || { totalLoads: 0, openLoads: 0, totalBids: 0, wonBids: 0, pendingBids: 0, totalRevenue: 0, totalTrucks: 0, availableTrucks: 0 };
    const recentLoads = data?.recentLoads || [];
    const recentBids = data?.recentBids || [];

    const statCards = [
        { icon: <Inventory />, label: 'My Loads', value: stats.totalLoads, color: '#1a237e', sub: `${stats.openLoads} open` },
        { icon: <Gavel />, label: 'My Bids', value: stats.totalBids, color: '#f57c00', sub: `${stats.wonBids} won` },
        { icon: <TrendingUp />, label: 'Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, color: '#2e7d32', sub: 'From accepted bids' },
        { icon: <LocalShipping />, label: 'My Trucks', value: stats.totalTrucks, color: '#d32f2f', sub: `${stats.availableTrucks} available` },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, fontSize: '1.5rem', fontWeight: 700 }}>{user?.name?.[0] || 'V'}</Avatar>
                    <Box>
                        <Typography variant="h4" fontWeight={700}>Dashboard</Typography>
                        <Typography variant="body2" color="text.secondary">Welcome back, {user?.name || 'User'}!</Typography>
                    </Box>
                </Box>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {statCards.map((stat, i) => (
                        <Grid size={{ xs: 6, md: 3 }} key={i}>
                            <MotionCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${stat.color}15`, color: stat.color, display: 'inline-flex', mb: 1 }}>{stat.icon}</Box>
                                    <Typography variant="h4" fontWeight={800} sx={{ my: 1 }}>{stat.value}</Typography>
                                    <Typography variant="body2" fontWeight={600}>{stat.label}</Typography>
                                    <Typography variant="caption" color="text.secondary">{stat.sub}</Typography>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="h6" fontWeight={700}>Recent Loads</Typography>
                                    <Button size="small" endIcon={<ArrowForward />} onClick={() => navigate('/loads')}>View All</Button>
                                </Box>
                                {recentLoads.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">No loads yet. Post your first!</Typography>
                                ) : recentLoads.map(load => (
                                    <Box key={load._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: 2, mb: 1, bgcolor: 'action.hover', cursor: 'pointer', '&:hover': { bgcolor: 'action.selected' } }}
                                        onClick={() => navigate(`/loads/${load._id}`)}>
                                        <Box>
                                            <Typography variant="body2" fontWeight={600}>{load.from} → {load.to}</Typography>
                                            <Typography variant="caption" color="text.secondary">{load.material} • {load.weight}T</Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Typography variant="body2" fontWeight={700} color="secondary.main">₹{load.price?.toLocaleString('en-IN')}</Typography>
                                            <Chip label={load.status} size="small" sx={{ textTransform: 'capitalize', mt: 0.5 }}
                                                color={load.status === 'open' ? 'success' : load.status === 'assigned' ? 'warning' : 'default'} />
                                        </Box>
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>My Bids</Typography>
                                {recentBids.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">No bids yet.</Typography>
                                ) : recentBids.map(bid => {
                                    const statusIcon = { pending: <HourglassTop sx={{ fontSize: 16, color: 'warning.main' }} />, accepted: <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />, rejected: <Cancel sx={{ fontSize: 16, color: 'error.main' }} /> };
                                    return (
                                        <Box key={bid._id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1.5, borderRadius: 2, mb: 1, bgcolor: 'action.hover', cursor: 'pointer', '&:hover': { bgcolor: 'action.selected' } }}
                                            onClick={() => bid.load && navigate(`/loads/${bid.load._id || bid.load}`)}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                {statusIcon[bid.status]}
                                                <Box>
                                                    <Typography variant="body2" fontWeight={600}>
                                                        {bid.load && typeof bid.load === 'object' ? `${bid.load.from} → ${bid.load.to}` : 'Load'}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">{bid.message?.slice(0, 40)}...</Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="body2" fontWeight={700} color="secondary.main">₹{bid.amount?.toLocaleString('en-IN')}</Typography>
                                        </Box>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={12}>
                        <Card>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Bid Performance</Typography>
                                <Grid container spacing={4}>
                                    {[
                                        { label: 'Win Rate', value: stats.totalBids ? Math.round((stats.wonBids / stats.totalBids) * 100) : 0, color: 'success' },
                                        { label: 'Pending', value: stats.totalBids ? Math.round((stats.pendingBids / stats.totalBids) * 100) : 0, color: 'warning' },
                                        { label: 'Active Loads', value: stats.totalLoads ? Math.round((stats.openLoads / stats.totalLoads) * 100) : 0, color: 'info' },
                                    ].map((item, i) => (
                                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
                                                <Typography variant="body2" fontWeight={700}>{item.value}%</Typography>
                                            </Box>
                                            <LinearProgress variant="determinate" value={item.value} color={item.color} sx={{ height: 8, borderRadius: 4 }} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MotionBox>
        </Container>
    );
}
