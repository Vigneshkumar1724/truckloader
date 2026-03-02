import { Box, Container, Typography, Grid, Card, CardContent, Button, Chip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Search, LocalShipping, PostAdd, Speed, VerifiedUser, Payments,
    TrendingUp, ArrowForward, Star,
} from '@mui/icons-material';
import SearchBar from '../components/SearchBar';
import StatsCounter from '../components/StatsCounter';
import { popularRoutes, testimonials } from '../data/mockData';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
};

export default function Home() {
    const navigate = useNavigate();
    const theme = useTheme();

    const features = [
        { icon: <Search sx={{ fontSize: 40 }} />, title: 'Find Loads', desc: 'Browse thousands of loads posted daily across India', action: () => navigate('/loads'), color: '#1a237e' },
        { icon: <LocalShipping sx={{ fontSize: 40 }} />, title: 'Find Trucks', desc: 'Connect with verified truck owners and transporters', action: () => navigate('/trucks'), color: '#2e7d32' },
        { icon: <PostAdd sx={{ fontSize: 40 }} />, title: 'Post Load', desc: 'Post your load and get bids from transporters', action: () => navigate('/post-load'), color: '#f57c00' },
    ];

    const benefits = [
        { icon: <VerifiedUser />, title: 'Verified Profiles', desc: 'GST & Aadhaar verified transporters' },
        { icon: <Payments />, title: 'Transparent Pricing', desc: 'Competitive bids, no hidden charges' },
        { icon: <Speed />, title: 'Instant Matching', desc: 'Find loads or trucks in seconds' },
        { icon: <TrendingUp />, title: 'Grow Business', desc: 'Expand your network across India' },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0a0e27 0%, #1a237e 50%, #000051 100%)'
                        : 'linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)',
                    color: 'white',
                    pt: { xs: 8, md: 12 },
                    pb: { xs: 10, md: 14 },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Floating shapes */}
                <Box sx={{
                    position: 'absolute', top: '10%', right: '5%', width: 200, height: 200,
                    borderRadius: '50%', bgcolor: 'rgba(245,124,0,0.08)', filter: 'blur(40px)',
                }} />
                <Box sx={{
                    position: 'absolute', bottom: '20%', left: '10%', width: 150, height: 150,
                    borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', filter: 'blur(30px)',
                }} />

                <Container maxWidth="lg">
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        sx={{ textAlign: 'center', mb: 5 }}
                    >
                        <Chip label="🚛 India's #1 Transport Marketplace" sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600 }} />
                        <Typography variant="h2" fontWeight={800} sx={{ mb: 2, fontSize: { xs: '2rem', md: '3.2rem' } }}>
                            Connect. Transport.{' '}
                            <Box component="span" sx={{ color: 'secondary.main' }}>Grow.</Box>
                        </Typography>
                        <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 600, mx: 'auto', mb: 4, fontWeight: 400 }}>
                            Find instant truck loads, book verified transporters, and streamline your logistics — all in one platform.
                        </Typography>
                    </MotionBox>

                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SearchBar variant="hero" />
                    </MotionBox>
                </Container>
            </Box>

            {/* Stats */}
            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 2 }}>
                <Card sx={{ borderRadius: 4, p: 2 }}>
                    <Grid container>
                        {[
                            { end: 50000, label: 'Loads Posted', suffix: '+' },
                            { end: 12000, label: 'Trucks Available', suffix: '+' },
                            { end: 200, label: 'Cities Covered', suffix: '+' },
                            { end: 8500, label: 'Happy Users', suffix: '+' },
                        ].map((stat, i) => (
                            <Grid size={{ xs: 6, md: 3 }} key={i}>
                                <StatsCounter {...stat} />
                            </Grid>
                        ))}
                    </Grid>
                </Card>
            </Container>

            {/* Features */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <MotionBox {...fadeInUp} sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                        What are you looking for?
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Select an option to get started
                    </Typography>
                </MotionBox>

                <Grid container spacing={4}>
                    {features.map((feature, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <MotionCard
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                sx={{ textAlign: 'center', p: 2, cursor: 'pointer', height: '100%' }}
                                onClick={feature.action}
                            >
                                <CardContent>
                                    <Box sx={{
                                        width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 2,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        bgcolor: `${feature.color}15`, color: feature.color,
                                    }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>{feature.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{feature.desc}</Typography>
                                    <Button variant="contained" color="secondary" endIcon={<ArrowForward />}>
                                        Get Started
                                    </Button>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* How It Works */}
            <Box sx={{ bgcolor: 'action.hover', py: 10 }}>
                <Container maxWidth="lg">
                    <MotionBox {...fadeInUp} sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>How It Works</Typography>
                        <Typography variant="body1" color="text.secondary">Simple 3-step process</Typography>
                    </MotionBox>

                    <Grid container spacing={4} sx={{ textAlign: 'center' }}>
                        {[
                            { step: '01', title: 'Post Your Load', desc: 'Enter pickup & drop location, material type, and weight' },
                            { step: '02', title: 'Get Bids', desc: 'Verified transporters will bid on your load with competitive rates' },
                            { step: '03', title: 'Ship It!', desc: 'Accept the best bid and track your cargo in real-time' },
                        ].map((item, i) => (
                            <Grid size={{ xs: 12, md: 4 }} key={i}>
                                <MotionBox
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                >
                                    <Typography variant="h2" fontWeight={800} sx={{ color: 'secondary.main', opacity: 0.3, mb: 1 }}>
                                        {item.step}
                                    </Typography>
                                    <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{item.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{item.desc}</Typography>
                                </MotionBox>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Benefits */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <MotionBox {...fadeInUp} sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>Why Choose CargoConnect?</Typography>
                </MotionBox>
                <Grid container spacing={3}>
                    {benefits.map((b, i) => (
                        <Grid size={{ xs: 6, md: 3 }} key={i}>
                            <MotionBox
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                sx={{ textAlign: 'center', p: 3 }}
                            >
                                <Box sx={{ color: 'primary.main', mb: 1 }}>{b.icon}</Box>
                                <Typography variant="subtitle1" fontWeight={700}>{b.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{b.desc}</Typography>
                            </MotionBox>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Popular Routes */}
            <Box sx={{ bgcolor: 'action.hover', py: 10 }}>
                <Container maxWidth="lg">
                    <MotionBox {...fadeInUp} sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>🔥 Popular Routes</Typography>
                        <Typography variant="body1" color="text.secondary">Most in-demand freight corridors</Typography>
                    </MotionBox>
                    <Grid container spacing={2}>
                        {popularRoutes.map((route, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                                <MotionCard
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/loads?from=${route.from}&to=${route.to}`)}
                                >
                                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                        <Typography variant="subtitle2" fontWeight={700}>
                                            {route.from} → {route.to}
                                        </Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                            <Typography variant="caption" color="text.secondary">{route.distance}</Typography>
                                            <Chip label={`${route.loads} loads`} size="small" color="secondary" sx={{ height: 22 }} />
                                        </Box>
                                    </CardContent>
                                </MotionCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Testimonials */}
            <Container maxWidth="lg" sx={{ py: 10 }}>
                <MotionBox {...fadeInUp} sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>What Our Users Say</Typography>
                </MotionBox>
                <Grid container spacing={3}>
                    {testimonials.map((t, i) => (
                        <Grid size={{ xs: 12, md: 4 }} key={i}>
                            <MotionCard
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                sx={{ height: '100%' }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                                        {[...Array(t.rating)].map((_, j) => (
                                            <Star key={j} sx={{ color: '#f57c00', fontSize: 20 }} />
                                        ))}
                                    </Box>
                                    <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic', lineHeight: 1.7 }}>
                                        "{t.text}"
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={700}>{t.name}</Typography>
                                    <Typography variant="caption" color="text.secondary">{t.company} • {t.city}</Typography>
                                </CardContent>
                            </MotionCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* CTA */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                    py: 8, textAlign: 'center', color: 'white',
                }}
            >
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
                        Ready to transform your transport business?
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, mb: 4 }}>
                        Join 8,500+ transporters and shippers already on CargoConnect
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button variant="contained" color="secondary" size="large" onClick={() => navigate('/post-load')}>
                            Post a Load
                        </Button>
                        <Button variant="outlined" size="large" sx={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white' }} onClick={() => navigate('/loads')}>
                            Browse Loads
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
