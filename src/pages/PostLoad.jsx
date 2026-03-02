import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Stepper, Step, StepLabel, TextField, Button,
    Autocomplete, FormControl, InputLabel, Select, MenuItem, Card, CardContent,
    Alert, Grid,
} from '@mui/material';
import { ArrowBack, ArrowForward, Check, PostAdd } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { loadsAPI } from '../services/api';
import { cities, truckTypes, materialTypes } from '../data/mockData';

const MotionBox = motion.create(Box);
const steps = ['Route Details', 'Cargo Info', 'Pricing', 'Review & Submit'];

export default function PostLoad() {
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useApp();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        from: '', to: '', material: '', weight: '', truckType: '',
        price: '', description: '', contact: '', pickupTime: '',
    });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setError('');
        try {
            await loadsAPI.create({
                ...form, weight: Number(form.weight), price: Number(form.price),
                pickupTime: form.pickupTime ? new Date(form.pickupTime).toISOString() : undefined,
            });
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const canProceed = () => {
        switch (activeStep) {
            case 0: return form.from && form.to && form.pickupTime;
            case 1: return form.material && form.weight && form.truckType;
            case 2: return form.price;
            default: return true;
        }
    };

    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Login required to post a load</Typography>
                <Button variant="contained" onClick={() => navigate('/auth')}>Login / Register</Button>
            </Container>
        );
    }

    if (submitted) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <MotionBox initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'success.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
                        <Check sx={{ fontSize: 40 }} />
                    </Box>
                </MotionBox>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Load Posted!</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Your load from {form.from} to {form.to} has been posted. Transporters will start bidding soon.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => navigate('/loads')}>View Marketplace</Button>
                    <Button variant="outlined" onClick={() => { setSubmitted(false); setActiveStep(0); setForm({ from: '', to: '', material: '', weight: '', truckType: '', price: '', description: '', contact: '', pickupTime: '' }); }}>
                        Post Another
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <PostAdd color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h4" fontWeight={700}>Post a Load</Typography>
                </Box>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
                    {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                </Stepper>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Card>
                    <CardContent sx={{ p: 4 }}>
                        {activeStep === 0 && (
                            <Grid container spacing={3}>
                                <Grid size={12}><Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Where is the load going?</Typography></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete value={form.from || null} onChange={(_, val) => update('from', val || '')} options={cities} renderInput={(p) => <TextField {...p} label="Pickup City *" />} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete value={form.to || null} onChange={(_, val) => update('to', val || '')} options={cities} renderInput={(p) => <TextField {...p} label="Drop City *" />} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        label="Pickup Date & Time *"
                                        type="datetime-local"
                                        fullWidth
                                        value={form.pickupTime}
                                        onChange={(e) => update('pickupTime', e.target.value)}
                                        slotProps={{ inputLabel: { shrink: true } }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        {activeStep === 1 && (
                            <Grid container spacing={3}>
                                <Grid size={12}><Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Tell us about your cargo</Typography></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete value={form.material || null} onChange={(_, val) => update('material', val || '')} options={materialTypes} renderInput={(p) => <TextField {...p} label="Material Type *" />} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField label="Weight (Tons) *" type="number" fullWidth value={form.weight} onChange={(e) => update('weight', e.target.value)} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth><InputLabel>Truck Type *</InputLabel>
                                        <Select value={form.truckType} label="Truck Type *" onChange={(e) => update('truckType', e.target.value)}>
                                            {truckTypes.map(t => <MenuItem key={t.value} value={t.value}>{t.label} ({t.capacity})</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={12}>
                                    <TextField label="Description (optional)" multiline rows={3} fullWidth value={form.description} onChange={(e) => update('description', e.target.value)} />
                                </Grid>
                            </Grid>
                        )}
                        {activeStep === 2 && (
                            <Grid container spacing={3}>
                                <Grid size={12}><Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Set your expected price</Typography></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField label="Expected Price (₹) *" type="number" fullWidth value={form.price} onChange={(e) => update('price', e.target.value)} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField label="Contact Number" fullWidth value={form.contact} onChange={(e) => update('contact', e.target.value)} placeholder="+91..." />
                                </Grid>
                            </Grid>
                        )}
                        {activeStep === 3 && (
                            <Box>
                                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Review your load details</Typography>
                                <Grid container spacing={2}>
                                    {[['Route', `${form.from} → ${form.to}`], ['Pickup Time', form.pickupTime ? new Date(form.pickupTime).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }) : '—'], ['Material', form.material], ['Weight', `${form.weight} Ton`], ['Truck Type', truckTypes.find(t => t.value === form.truckType)?.label], ['Expected Price', `₹${Number(form.price).toLocaleString('en-IN')}`]].map(([l, v], i) => (
                                        <Grid size={{ xs: 12, sm: 6 }} key={i}>
                                            <Typography variant="caption" color="text.secondary">{l}</Typography>
                                            <Typography variant="body1" fontWeight={600}>{v}</Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button disabled={activeStep === 0} startIcon={<ArrowBack />} onClick={() => setActiveStep(s => s - 1)}>Back</Button>
                            {activeStep < steps.length - 1 ? (
                                <Button variant="contained" endIcon={<ArrowForward />} disabled={!canProceed()} onClick={() => setActiveStep(s => s + 1)}>Next</Button>
                            ) : (
                                <Button variant="contained" color="secondary" endIcon={<Check />} onClick={handleSubmit}>Post Load</Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </MotionBox>
        </Container>
    );
}
