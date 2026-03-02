import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Typography, Grid, Box, TextField, FormControl, InputLabel,
    Select, MenuItem, Chip, Pagination, Button, Autocomplete, Skeleton,
} from '@mui/material';
import { FilterAlt, Clear, Search as SearchIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import LoadCard from '../components/LoadCard';
import { loadsAPI } from '../services/api';
import { cities, truckTypes, loads as mockLoads } from '../data/mockData';

const MotionBox = motion.create(Box);

export default function LoadMarketplace() {
    const navigate = useNavigate();
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({ from: '', to: '', truckType: '', status: '' });

    const fetchLoads = async () => {
        setLoading(true);
        try {
            const params = { page, limit: 9 };
            if (filters.from) params.from = filters.from;
            if (filters.to) params.to = filters.to;
            if (filters.truckType) params.truckType = filters.truckType;
            if (filters.status) params.status = filters.status;

            const data = await loadsAPI.getAll(params);
            setLoads(data.loads);
            setTotal(data.total);
            setTotalPages(data.pages);
        } catch {
            // Fallback to mock data
            setLoads(mockLoads.slice((page - 1) * 9, page * 9));
            setTotal(mockLoads.length);
            setTotalPages(Math.ceil(mockLoads.length / 9));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLoads(); }, [page, filters]);

    const updateFilter = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ from: '', to: '', truckType: '', status: '' });
        setPage(1);
    };

    const activeFilters = Object.entries(filters).filter(([, v]) => v);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <MotionBox initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Load Marketplace</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    {total} loads available across India
                </Typography>

                {/* Filters */}
                <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                    <FilterAlt color="action" />
                    <Autocomplete size="small" sx={{ minWidth: 160 }}
                        value={filters.from || null} onChange={(_, v) => updateFilter('from', v || '')}
                        options={cities} renderInput={(p) => <TextField {...p} label="From" />} />
                    <Autocomplete size="small" sx={{ minWidth: 160 }}
                        value={filters.to || null} onChange={(_, v) => updateFilter('to', v || '')}
                        options={cities} renderInput={(p) => <TextField {...p} label="To" />} />
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Truck Type</InputLabel>
                        <Select value={filters.truckType} label="Truck Type" onChange={(e) => updateFilter('truckType', e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            {truckTypes.map(t => <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select value={filters.status} label="Status" onChange={(e) => updateFilter('status', e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="open">Open</MenuItem>
                            <MenuItem value="assigned">Assigned</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    {activeFilters.length > 0 && (
                        <Button size="small" startIcon={<Clear />} onClick={clearFilters}>Clear</Button>
                    )}
                </Box>

                {activeFilters.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        {activeFilters.map(([key, val]) => (
                            <Chip key={key} label={`${key}: ${val}`} size="small" onDelete={() => updateFilter(key, '')} color="primary" variant="outlined" />
                        ))}
                    </Box>
                )}

                {/* Load Grid */}
                <Grid container spacing={3}>
                    {loading ? (
                        [...Array(6)].map((_, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                                <Skeleton variant="rounded" height={200} />
                            </Grid>
                        ))
                    ) : loads.length === 0 ? (
                        <Grid size={12}>
                            <Box sx={{ textAlign: 'center', py: 6 }}>
                                <Typography variant="h6" color="text.secondary">No loads found matching your filters</Typography>
                                <Button sx={{ mt: 2 }} onClick={clearFilters}>Clear Filters</Button>
                            </Box>
                        </Grid>
                    ) : (
                        loads.map(load => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={load._id || load.id}>
                                <LoadCard load={load} onClick={() => navigate(`/loads/${load._id || load.id}`)} />
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
