import { Box, Container, Typography, Grid, Link as MuiLink, IconButton, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import {
    LocalShipping, Facebook, Twitter, Instagram, LinkedIn,
    Phone, Email, LocationOn, Apple, Shop,
} from '@mui/icons-material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                bgcolor: 'primary.dark',
                color: 'white',
                pt: 8, pb: 3, mt: 'auto',
                background: 'linear-gradient(135deg, #000051 0%, #1a237e 100%)',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <LocalShipping sx={{ fontSize: 36, color: 'secondary.main' }} />
                            <Typography variant="h5" fontWeight={800}>
                                Cargo<span style={{ color: '#f57c00' }}>Connect</span>
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ opacity: 0.7, mb: 2, lineHeight: 1.8, maxWidth: 320 }}>
                            India's #1 truck and load marketplace. Connect with verified transporters,
                            find instant loads, and grow your transport business.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                                <IconButton key={i} size="small" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#f57c00' } }}>
                                    <Icon fontSize="small" />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Links */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'secondary.main' }}>
                            MARKETPLACE
                        </Typography>
                        {[
                            { label: 'Find Loads', path: '/loads' },
                            { label: 'Find Trucks', path: '/trucks' },
                            { label: 'Post Load', path: '/post-load' },
                            { label: 'Post Truck', path: '/post-truck' },
                            { label: 'Live Tracking', path: '/tracking' },
                        ].map(item => (
                            <MuiLink
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={{
                                    display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                    mb: 1, fontSize: '0.875rem',
                                    '&:hover': { color: 'white', transform: 'translateX(4px)' },
                                    transition: 'all 0.2s',
                                }}
                            >
                                {item.label}
                            </MuiLink>
                        ))}
                    </Grid>

                    {/* Company */}
                    <Grid size={{ xs: 6, md: 2 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'secondary.main' }}>
                            COMPANY
                        </Typography>
                        {['About Us', 'Careers', 'Blog', 'Press', 'Terms & Conditions', 'Privacy Policy'].map(item => (
                            <MuiLink
                                key={item}
                                href="#"
                                sx={{
                                    display: 'block', color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                                    mb: 1, fontSize: '0.875rem',
                                    '&:hover': { color: 'white' },
                                }}
                            >
                                {item}
                            </MuiLink>
                        ))}
                    </Grid>

                    {/* Contact */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: 'secondary.main' }}>
                            CONTACT US
                        </Typography>
                        {[
                            { icon: <Phone fontSize="small" />, text: '+91 1800-XXX-XXXX (Toll Free)' },
                            { icon: <Email fontSize="small" />, text: 'support@cargoconnect.in' },
                            { icon: <LocationOn fontSize="small" />, text: 'Gurugram, Haryana, India' },
                        ].map((item, i) => (
                            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'rgba(255,255,255,0.6)' }}>
                                {item.icon}
                                <Typography variant="body2">{item.text}</Typography>
                            </Box>
                        ))}

                        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 1.5, color: 'secondary.main' }}>
                            DOWNLOAD APP
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Apple />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.3)', color: 'white', textTransform: 'none',
                                    '&:hover': { borderColor: '#f57c00', bgcolor: 'rgba(245,124,0,0.1)' }
                                }}
                            >
                                App Store
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<Shop />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.3)', color: 'white', textTransform: 'none',
                                    '&:hover': { borderColor: '#f57c00', bgcolor: 'rgba(245,124,0,0.1)' }
                                }}
                            >
                                Play Store
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 4 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>
                        © 2026 CargoConnect. All rights reserved.
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.5 }}>
                        Made with ❤️ in India
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
