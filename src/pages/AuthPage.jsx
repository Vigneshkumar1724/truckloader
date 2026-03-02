import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Card, CardContent, TextField, Button,
    ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem,
    Alert, Divider, Chip,
} from '@mui/material';
import { LocalShipping, Inventory, Login as LoginIcon, PersonAdd } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { cities } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function AuthPage() {
    const [mode, setMode] = useState('login');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register } = useApp();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '', email: '', password: '', phone: '',
        role: 'shipper', companyName: '', city: '',
    });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (mode === 'login') {
                await login(form.email, form.password);
            } else {
                await register(form);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
                        🚛 CargoConnect
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        India's #1 Load & Truck Marketplace
                    </Typography>
                </Box>

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <ToggleButtonGroup value={mode} exclusive onChange={(_, v) => v && setMode(v)} color="primary">
                                <ToggleButton value="login"><LoginIcon sx={{ mr: 1 }} /> Login</ToggleButton>
                                <ToggleButton value="register"><PersonAdd sx={{ mr: 1 }} /> Register</ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                        <Box component="form" onSubmit={handleSubmit}>
                            {mode === 'register' && (
                                <TextField label="Full Name" fullWidth required sx={{ mb: 2 }}
                                    value={form.name} onChange={(e) => update('name', e.target.value)} />
                            )}

                            <TextField label="Email" type="email" fullWidth required sx={{ mb: 2 }}
                                value={form.email} onChange={(e) => update('email', e.target.value)} />

                            <TextField label="Password" type="password" fullWidth required sx={{ mb: 2 }}
                                value={form.password} onChange={(e) => update('password', e.target.value)}
                                inputProps={{ minLength: 6 }} />

                            {mode === 'register' && (
                                <>
                                    <TextField label="Phone" fullWidth sx={{ mb: 2 }}
                                        value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91..." />

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1 }}>I am a:</Typography>
                                        <ToggleButtonGroup value={form.role} exclusive fullWidth
                                            onChange={(_, v) => v && update('role', v)} color="primary">
                                            <ToggleButton value="shipper">
                                                <Inventory sx={{ mr: 1 }} /> Shipper
                                            </ToggleButton>
                                            <ToggleButton value="transporter">
                                                <LocalShipping sx={{ mr: 1 }} /> Transporter
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>

                                    <TextField label="Company Name" fullWidth sx={{ mb: 2 }}
                                        value={form.companyName} onChange={(e) => update('companyName', e.target.value)} />

                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel>City</InputLabel>
                                        <Select value={form.city} label="City" onChange={(e) => update('city', e.target.value)}>
                                            {cities.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </>
                            )}

                            <Button type="submit" variant="contained" fullWidth size="large"
                                disabled={loading} sx={{ py: 1.5, fontSize: '1rem' }}>
                                {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                            </Button>
                        </Box>

                        {mode === 'login' && (
                            <Box sx={{ mt: 3 }}>
                                <Divider><Chip label="Demo Account" size="small" /></Divider>
                                <Alert severity="info" sx={{ mt: 2 }}>
                                    <strong>Email:</strong> vicky@email.com<br />
                                    <strong>Password:</strong> password123
                                </Alert>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </MotionBox>
        </Container>
    );
}
