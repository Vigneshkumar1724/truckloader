import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem,
    Chip, Pagination, Autocomplete, TextField, Switch, FormControlLabel, Skeleton,
    Button,
} from '@mui/material';
import { FilterAlt, Clear } from '@mui/icons-material';
import { motion } from 'framer-motion';
import TruckCard from '../components/TruckCard';
import { trucksAPI } from '../services/api';
import { cities, truckTypes, trucks as mockTrucks } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function TruckMarketplace() {
    const navigate = useNavigate();
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ city: '', type: '', available: false });

    const fetchTrucks = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9 };
            if (filters.city) params.city = filters.city;
            if (filters.type) params.type = filters.type;
            if (filters.available) params.available = 'true';

            const data = await trucksAPI.getAll(params);
            setTrucks(data.trucks);
            setTotal(data.total);
            setTotalPages(data.pages);
        } catch {
            setTrucks(mockTrucks.slice((page - 1) * 9, page * 9));
            setTotal(mockTrucks.length);
            setTotalPages(Math.ceil(mockTrucks.length / 9));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTrucks(); }, [page, filters]);

    const updateFilter = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ city: '', type: '', available: false });
        setPage(1);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Truck Marketplace</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {total} verified trucks across India
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                    <FilterAlt color="action" />
                    <Autocomplete size="small" sx={{ minWidth: 160 }}
                        value={filters.city || null} onChange={(_, v) => updateFilter('city', v || '')}
                        options={cities} renderInput={(p) => <TextField {...p} label="City" />} />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Truck Type</InputLabel>
                        <Select value={filters.type} label="Truck Type" onChange={(e) => updateFilter('type', e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {truckTypes.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControlLabel
                        control={<Switch checked={filters.available} onChange={(e) => updateFilter('available', e.target.checked)} />}
                        label="Available Only"
                    />
                    {(filters.city || filters.type || filters.available) && (
                        <Button size="small" startIcon={<Clear />} onClick={clearFilters}>Clear</Button>
                    )}
                </Box>

                <Grid container spacing={3}>
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rounded" height={200} />
                            </Grid>
                        ))
                    ) : trucks.length === 0 ? (
                        <Grid size={12}>
                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                <Typography variant="h6" color="text.secondary">No trucks found</Typography>
                                <Button sx={{ mt: 2 }} onClick={clearFilters}>Clear Filters</Button>
                            </Box>
                        </Grid>
                    ) : (
                        trucks.map(truck => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={truck._id || truck.id}>
                                <TruckCard truck={truck} onClick={() => navigate(`/trucks/${truck._id || truck.id}`)} />
                            </Grid>
                        ))
                    )}
                </Grid>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
                    </Box>
                )}
            </MotionBox>
        </Container>
    );
}
