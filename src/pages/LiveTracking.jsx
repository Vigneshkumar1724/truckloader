import { useState, useEffect, useRef } from 'react';
import {
    Container, Typography, Box, Card, CardContent, Grid, Chip, Avatar,
    List, ListItem, ListItemAvatar, ListItemText, Divider, Button,
} from '@mui/material';
import { LocalShipping, Circle, FiberManualRecord, Speed, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

// Simulated truck positions on key Indian routes
const initialTrucks = [
    { id: 1, name: 'TN Cargo #407', route: 'Delhi → Mumbai', progress: 35, speed: 62, reg: 'DL-01-AB-1234', color: '#f57c00' },
    { id: 2, name: 'NF Lines #2523', route: 'Mumbai → Pune', progress: 72, speed: 48, reg: 'MH-04-CD-5678', color: '#2e7d32' },
    { id: 3, name: 'Patel #5028', route: 'Bangalore → Chennai', progress: 58, speed: 55, reg: 'KA-01-EF-9012', color: '#1565c0' },
    { id: 4, name: 'Reddy Carriers', route: 'Hyderabad → Bangalore', progress: 15, speed: 70, reg: 'TS-08-MN-6789', color: '#d32f2f' },
    { id: 5, name: 'Gujarat Cargo', route: 'Ahmedabad → Mumbai', progress: 88, speed: 45, reg: 'GJ-05-IJ-7890', color: '#7b1fa2' },
    { id: 6, name: 'Metro Freight', route: 'Kolkata → Patna', progress: 42, speed: 58, reg: 'WB-02-OP-1234', color: '#00838f' },
];

export default function LiveTracking() {
    const [trucks, setTrucks] = useState(initialTrucks);
    const [selectedTruck, setSelectedTruck] = useState(null);

    // Simulate truck movement
    useEffect(() => {
        const interval = setInterval(() => {
            setTrucks(prev => prev.map(t => ({
                ...t,
                progress: Math.min(100, t.progress + (Math.random() * 0.5)),
                speed: Math.max(30, Math.min(80, t.speed + (Math.random() * 6 - 3))),
            })));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>🛰️ Live Tracking</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Real-time tracking of trucks across Indian routes
                </Typography>

                <Grid container spacing={3}>
                    {/* Map Area */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ height: 500, position: 'relative', overflow: 'hidden' }}>
                            {/* Stylized Map Background */}
                            <Box sx={{
                                position: 'absolute', inset: 0,
                                background: (theme) => theme.palette.mode === 'dark'
                                    ? 'linear-gradient(145deg, #0a1628 0%, #0d1f3c 50%, #0a1628 100%)'
                                    : 'linear-gradient(145deg, #e8eaf6 0%, #c5cae9 50%, #e8eaf6 100%)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {/* Grid lines */}
                                <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                                    {[...Array(10)].map((_, i) => (
                                        <Box key={`h${i}`} sx={{ position: 'absolute', left: 0, right: 0, top: `${i * 10}%`, height: 1, bgcolor: 'text.primary' }} />
                                    ))}
                                    {[...Array(10)].map((_, i) => (
                                        <Box key={`v${i}`} sx={{ position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: 1, bgcolor: 'text.primary' }} />
                                    ))}
                                </Box>

                                {/* City dots */}
                                {[
                                    { name: 'Delhi', x: 52, y: 20 },
                                    { name: 'Mumbai', x: 30, y: 55 },
                                    { name: 'Bangalore', x: 42, y: 80 },
                                    { name: 'Chennai', x: 55, y: 78 },
                                    { name: 'Hyderabad', x: 45, y: 62 },
                                    { name: 'Kolkata', x: 72, y: 38 },
                                    { name: 'Pune', x: 32, y: 60 },
                                    { name: 'Ahmedabad', x: 25, y: 42 },
                                    { name: 'Jaipur', x: 42, y: 28 },
                                    { name: 'Patna', x: 65, y: 30 },
                                ].map(city => (
                                    <Box key={city.name} sx={{ position: 'absolute', left: `${city.x}%`, top: `${city.y}%`, transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 2 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main', mx: 'auto', mb: 0.5, boxShadow: '0 0 8px rgba(26,35,126,0.5)' }} />
                                        <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600, color: 'text.secondary', textShadow: (theme) => theme.palette.mode === 'dark' ? '0 0 4px rgba(0,0,0,0.8)' : '0 0 4px rgba(255,255,255,0.8)' }}>
                                            {city.name}
                                        </Typography>
                                    </Box>
                                ))}

                                {/* Animated truck dots */}
                                {trucks.map(truck => {
                                    const routePositions = {
                                        'Delhi → Mumbai': { sx: 52, sy: 20, ex: 30, ey: 55 },
                                        'Mumbai → Pune': { sx: 30, sy: 55, ex: 32, ey: 60 },
                                        'Bangalore → Chennai': { sx: 42, sy: 80, ex: 55, ey: 78 },
                                        'Hyderabad → Bangalore': { sx: 45, sy: 62, ex: 42, ey: 80 },
                                        'Ahmedabad → Mumbai': { sx: 25, sy: 42, ex: 30, ey: 55 },
                                        'Kolkata → Patna': { sx: 72, sy: 38, ex: 65, ey: 30 },
                                    };
                                    const pos = routePositions[truck.route] || { sx: 50, sy: 50, ex: 50, ey: 50 };
                                    const x = pos.sx + (pos.ex - pos.sx) * (truck.progress / 100);
                                    const y = pos.sy + (pos.ey - pos.sy) * (truck.progress / 100);
                                    const isSelected = selectedTruck?.id === truck.id;

                                    return (
                                        <Box
                                            key={truck.id}
                                            onClick={() => setSelectedTruck(truck)}
                                            sx={{
                                                position: 'absolute', left: `${x}%`, top: `${y}%`,
                                                transform: 'translate(-50%, -50%)', cursor: 'pointer',
                                                zIndex: isSelected ? 10 : 3,
                                                transition: 'left 2s linear, top 2s linear',
                                            }}
                                        >
                                            {/* Pulse ring */}
                                            <Box sx={{
                                                position: 'absolute', inset: -8,
                                                borderRadius: '50%', border: `2px solid ${truck.color}`,
                                                opacity: 0.4,
                                                animation: 'pulse 2s infinite',
                                                '@keyframes pulse': {
                                                    '0%': { transform: 'scale(1)', opacity: 0.4 },
                                                    '50%': { transform: 'scale(1.5)', opacity: 0 },
                                                    '100%': { transform: 'scale(1)', opacity: 0.4 },
                                                },
                                            }} />
                                            <Box sx={{
                                                width: isSelected ? 18 : 14, height: isSelected ? 18 : 14,
                                                borderRadius: '50%', bgcolor: truck.color,
                                                boxShadow: `0 0 12px ${truck.color}`,
                                                border: '2px solid white',
                                                transition: 'all 0.2s',
                                            }} />
                                            {isSelected && (
                                                <Box sx={{
                                                    position: 'absolute', top: -45, left: '50%', transform: 'translateX(-50%)',
                                                    bgcolor: 'background.paper', px: 1.5, py: 0.5, borderRadius: 1,
                                                    boxShadow: 3, whiteSpace: 'nowrap',
                                                }}>
                                                    <Typography variant="caption" fontWeight={700}>{truck.name}</Typography>
                                                </Box>
                                            )}
                                        </Box>
                                    );
                                })}

                                {/* Route lines (simplified) */}
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
                                    {trucks.map(truck => {
                                        const routePositions = {
                                            'Delhi → Mumbai': { sx: 52, sy: 20, ex: 30, ey: 55 },
                                            'Mumbai → Pune': { sx: 30, sy: 55, ex: 32, ey: 60 },
                                            'Bangalore → Chennai': { sx: 42, sy: 80, ex: 55, ey: 78 },
                                            'Hyderabad → Bangalore': { sx: 45, sy: 62, ex: 42, ey: 80 },
                                            'Ahmedabad → Mumbai': { sx: 25, sy: 42, ex: 30, ey: 55 },
                                            'Kolkata → Patna': { sx: 72, sy: 38, ex: 65, ey: 30 },
                                        };
                                        const pos = routePositions[truck.route];
                                        if (!pos) return null;
                                        return (
                                            <line
                                                key={truck.id}
                                                x1={`${pos.sx}%`} y1={`${pos.sy}%`}
                                                x2={`${pos.ex}%`} y2={`${pos.ey}%`}
                                                stroke={truck.color} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.3"
                                            />
                                        );
                                    })}
                                </svg>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Truck List */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{ height: 500, overflow: 'auto' }}>
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Active Trucks ({trucks.length})</Typography>
                                <List disablePadding>
                                    {trucks.map(truck => (
                                        <ListItem
                                            key={truck.id}
                                            onClick={() => setSelectedTruck(truck)}
                                            sx={{
                                                borderRadius: 2, mb: 1, cursor: 'pointer',
                                                bgcolor: selectedTruck?.id === truck.id ? 'action.selected' : 'action.hover',
                                                '&:hover': { bgcolor: 'action.selected' },
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: truck.color, width: 36, height: 36 }}>
                                                    <LocalShipping sx={{ fontSize: 18 }} />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body2" fontWeight={700}>{truck.name}</Typography>
                                                }
                                                secondaryTypographyProps={{ component: 'div' }}
                                                secondary={
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary">{truck.route}</Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                                            <Chip icon={<Speed />} label={`${Math.round(truck.speed)} km/h`} size="small" sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem' } }} />
                                                            <Chip label={`${Math.round(truck.progress)}%`} size="small" color="secondary" sx={{ height: 22, '& .MuiChip-label': { fontSize: '0.7rem' } }} />
                                                        </Box>
                                                        {/* Progress bar */}
                                                        <Box sx={{ mt: 1, height: 4, borderRadius: 2, bgcolor: 'action.hover', overflow: 'hidden' }}>
                                                            <Box sx={{ height: '100%', width: `${truck.progress}%`, bgcolor: truck.color, borderRadius: 2, transition: 'width 2s linear' }} />
                                                        </Box>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MotionBox>
        </Container>
    );
}
