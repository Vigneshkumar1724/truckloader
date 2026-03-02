import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Chip, Button, Divider } from '@mui/material';
import {
    LocationOn, ArrowForward, Scale, LocalShipping, AccessTime,
    CurrencyRupee, Gavel, Schedule,
} from '@mui/icons-material';
import { getTruckTypeLabel } from '../data/mockData';

export default function LoadCard({ load }) {
    const navigate = useNavigate();

    const statusColor = {
        open: 'success', assigned: 'warning', completed: 'default',
    };

    const timeAgo = (dateStr) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const formatPickup = (dateStr) => {
        if (!dateStr) return null;
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' +
            d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <Card
            sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(`/loads/${load._id || load.id}`)}
        >
            <CardContent sx={{ flex: 1, p: 2.5 }}>
                {/* Route */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LocationOn color="primary" fontSize="small" />
                    <Typography variant="subtitle1" fontWeight={700}>{load.from}</Typography>
                    <ArrowForward sx={{ fontSize: 18, color: 'text.secondary' }} />
                    <Typography variant="subtitle1" fontWeight={700}>{load.to}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Chip
                        label={load.status}
                        size="small"
                        color={statusColor[load.status]}
                        sx={{ textTransform: 'capitalize', fontWeight: 600 }}
                    />
                </Box>

                {/* Material & Details */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {load.material}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip icon={<Scale />} label={`${load.weight} Ton`} size="small" variant="outlined" />
                    <Chip icon={<LocalShipping />} label={getTruckTypeLabel(load.truckType)} size="small" variant="outlined" />
                    {load.pickupTime && (
                        <Chip icon={<Schedule />} label={formatPickup(load.pickupTime)} size="small" color="primary" variant="outlined" />
                    )}
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Price & Meta */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CurrencyRupee sx={{ fontSize: 20, color: 'secondary.main' }} />
                        <Typography variant="h6" fontWeight={700} color="secondary.main">
                            {load.price.toLocaleString('en-IN')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Gavel sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {load.bids?.length || 0} bids
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                                {timeAgo(load.createdAt)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
