import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Autocomplete, TextField, Button, Paper } from '@mui/material';
import { Search, SwapHoriz } from '@mui/icons-material';
import { cities } from '../data/mockData';

export default function SearchBar({ variant = 'hero' }) {
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (from) params.set('from', from);
        if (to) params.set('to', to);
        navigate(`/loads?${params.toString()}`);
    };

    const handleSwap = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const isHero = variant === 'hero';

    return (
        <Paper
            elevation={isHero ? 8 : 2}
            sx={{
                p: isHero ? 3 : 2,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: { xs: 'wrap', md: 'nowrap' },
                maxWidth: isHero ? 700 : '100%',
                mx: isHero ? 'auto' : 0,
                ...(isHero && {
                    background: (theme) => theme.palette.mode === 'dark'
                        ? 'rgba(18, 22, 56, 0.95)'
                        : 'rgba(255, 255, 255, 0.97)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'divider',
                }),
            }}
        >
            <Autocomplete
                value={from}
                onChange={(_, val) => setFrom(val)}
                options={cities}
                renderInput={(params) => (
                    <TextField {...params} label="From City" placeholder="Select origin" size={isHero ? 'medium' : 'small'} />
                )}
                sx={{ flex: 1, minWidth: 180 }}
            />

            <Button
                onClick={handleSwap}
                sx={{
                    minWidth: 40, width: 40, height: 40, borderRadius: '50%',
                    bgcolor: 'action.hover', flexShrink: 0,
                }}
            >
                <SwapHoriz />
            </Button>

            <Autocomplete
                value={to}
                onChange={(_, val) => setTo(val)}
                options={cities}
                renderInput={(params) => (
                    <TextField {...params} label="To City" placeholder="Select destination" size={isHero ? 'medium' : 'small'} />
                )}
                sx={{ flex: 1, minWidth: 180 }}
            />

            <Button
                variant="contained"
                color="secondary"
                onClick={handleSearch}
                startIcon={<Search />}
                sx={{
                    px: 4, py: isHero ? 1.5 : 1,
                    flexShrink: 0,
                    minWidth: { xs: '100%', md: 'auto' },
                }}
            >
                Search Loads
            </Button>
        </Paper>
    );
}
