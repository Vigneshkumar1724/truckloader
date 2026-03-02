import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Chip, Rating, Divider } from '@mui/material';
import {
    LocalShipping, LocationOn, Scale, Speed, Star, CheckCircle,
} from '@mui/icons-material';
import { getTruckTypeLabel } from '../data/mockData';

export default function TruckCard({ truck }) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
            onClick={() => navigate(`/trucks/${truck._id || truck.id}`)}
        >
            <CardContent sx={{ flex: 1, p: 2.5 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalShipping color="primary" />
                        <Typography variant="subtitle1" fontWeight={700}>
                            {truck.make} {truck.model}
                        </Typography>
                    </Box>
                    <Chip
                        label={truck.isAvailable ? 'Available' : 'On Trip'}
                        size="small"
                        color={truck.isAvailable ? 'success' : 'default'}
                        sx={{ fontWeight: 600 }}
                    />
                </Box>

                {/* Registration */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontFamily: 'monospace', fontWeight: 600 }}>
                    {truck.registrationNo}
                </Typography>

                {/* Details */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip icon={<LocalShipping />} label={getTruckTypeLabel(truck.type)} size="small" variant="outlined" />
                    <Chip icon={<Scale />} label={`${truck.capacity} Ton`} size="small" variant="outlined" />
                    <Chip icon={<LocationOn />} label={truck.currentCity} size="small" variant="outlined" color="primary" />
                </Box>

                {/* Routes */}
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ mb: 0.5, display: 'block' }}>
                    Available Routes:
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    {truck.availableRoutes?.join(' • ') || 'No routes listed'}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                {/* Rating & Trips */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Rating value={truck.rating} precision={0.1} size="small" readOnly />
                        <Typography variant="body2" fontWeight={600}>{truck.rating}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Speed sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {truck.tripsCompleted} trips
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
