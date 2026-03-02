import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Box, Stepper, Step, StepLabel, TextField, Button,
    Autocomplete, FormControl, InputLabel, Select, MenuItem, Card, CardContent,
    Grid, Chip, Alert,
} from '@mui/material';
import { ArrowBack, ArrowForward, Check, LocalShipping } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { trucksAPI } from '../services/api';
import { cities, truckTypes } from '../data/mockData';

const MotionBox = motion.create(Box);
const steps = ['Truck Details', 'Routes & Availability', 'Review & Submit'];

export default function PostTruck() {
    const [activeStep, setActiveStep] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { isAuthenticated } = useApp();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        type: '', make: '', model: '', registrationNo: '',
        capacity: '', currentCity: '', availableRoutes: [],
    });

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async () => {
        setError('');
        try {
            await trucksAPI.create({ ...form, capacity: Number(form.capacity) });
            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const canProceed = () => {
        switch (activeStep) {
            case 0: return form.type && form.make && form.model && form.registrationNo && form.capacity;
            case 1: return form.currentCity;
            default: return true;
        }
    };

    if (!isAuthenticated) {
        return (
            <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Login required to register a truck</Typography>
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
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Truck Registered!</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Your {form.make} {form.model} has been listed.</Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button variant="contained" onClick={() => navigate('/trucks')}>View Marketplace</Button>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <LocalShipping color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h4" fontWeight={700}>Register a Truck</Typography>
                </Box>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
                    {steps.map(label => <Step key={label}><StepLabel>{label}</StepLabel></Step>)}
                </Stepper>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <Card>
                    <CardContent sx={{ p: 4 }}>
                        {activeStep === 0 && (
                            <Grid container spacing={3}>
                                <Grid size={12}><Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Tell us about your truck</Typography></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <FormControl fullWidth><InputLabel>Truck Type *</InputLabel>
                                        <Select value={form.type} label="Truck Type *" onChange={(e) => update('type', e.target.value)}>
                                            {truckTypes.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><TextField label="Make *" fullWidth value={form.make} onChange={(e) => update('make', e.target.value)} placeholder="e.g., Tata Motors" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><TextField label="Model *" fullWidth value={form.model} onChange={(e) => update('model', e.target.value)} placeholder="e.g., Tata 407" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><TextField label="Registration No. *" fullWidth value={form.registrationNo} onChange={(e) => update('registrationNo', e.target.value)} placeholder="e.g., DL-01-AB-1234" /></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}><TextField label="Capacity (Tons) *" type="number" fullWidth value={form.capacity} onChange={(e) => update('capacity', e.target.value)} /></Grid>
                            </Grid>
                        )}
                        {activeStep === 1 && (
                            <Grid container spacing={3}>
                                <Grid size={12}><Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>Routes & Location</Typography></Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Autocomplete value={form.currentCity || null} onChange={(_, val) => update('currentCity', val || '')} options={cities} renderInput={(p) => <TextField {...p} label="Current City *" />} />
                                </Grid>
                                <Grid size={12}>
                                    <Autocomplete multiple value={form.availableRoutes} onChange={(_, val) => update('availableRoutes', val)}
                                        options={cities.flatMap(c1 => cities.filter(c2 => c2 !== c1).map(c2 => `${c1}-${c2}`))}
                                        renderInput={(p) => <TextField {...p} label="Available Routes" placeholder="Add routes" />}
                                        renderTags={(selected, getTagProps) => selected.map((o, i) => <Chip {...getTagProps({ index: i })} key={o} label={o} size="small" />)}
                                        freeSolo />
                                </Grid>
                            </Grid>
                        )}
                        {activeStep === 2 && (
                            <Box>
                                <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>Review truck details</Typography>
                                <Grid container spacing={2}>
                                    {[['Type', truckTypes.find(t => t.value === form.type)?.label], ['Make & Model', `${form.make} ${form.model}`], ['Registration', form.registrationNo], ['Capacity', `${form.capacity} Ton`], ['City', form.currentCity]].map(([l, v], i) => (
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
                                <Button variant="contained" color="secondary" endIcon={<Check />} onClick={handleSubmit}>Register Truck</Button>
                            )}
                        </Box>
                    </CardContent>
                </Card>
            </MotionBox>
        </Container>
    );
}
