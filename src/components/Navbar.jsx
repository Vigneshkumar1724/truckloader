import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Box, Button, IconButton, Avatar, Drawer,
    List, ListItem, ListItemIcon, ListItemText, Badge, Divider, useMediaQuery,
    useTheme, Menu, MenuItem,
} from '@mui/material';
import {
    Menu as MenuIcon, LocalShipping, Inventory, PostAdd, Dashboard,
    DarkMode, LightMode, Notifications, MyLocation, Close, Login, Logout,
    PersonAdd,
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';
import NotificationDrawer from './NotificationDrawer';

const navItems = [
    { label: 'Find', label2: 'Loads', path: '/loads', icon: <Inventory /> },
    { label: 'Find', label2: 'Trucks', path: '/trucks', icon: <LocalShipping /> },
    { label: 'Post', label2: 'Load', path: '/post-load', icon: <PostAdd /> },
    { label: 'Live', label2: 'Tracking', path: '/tracking', icon: <MyLocation /> },
];

export default function Navbar() {
    const { darkMode, toggleDarkMode, notifications, markNotificationRead, isAuthenticated, user, logout } = useApp();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleLogout = () => {
        setAnchorEl(null);
        logout();
        navigate('/');
    };

    return (
        <>
            <AppBar position="sticky" elevation={0}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <LocalShipping sx={{ color: '#f57c00' }} />
                        <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: -0.5 }}>
                            Cargo<span style={{ color: '#f57c00' }}>Connect</span>
                        </Typography>
                    </Box>

                    {/* Desktop Nav */}
                    {!isMobile && (
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {navItems.map(item => (
                                <Button key={item.path} color="#f57c00" startIcon={item.icon}
                                    component={Link} to={item.path} sx={{ textTransform: 'none', fontWeight: 600, color: '#f57c00' }}>
                                    <Box>
                                        <Typography variant="body2" fontWeight={700} color='#fff'>{item.label} <span style={{ color: '#f57c00' }}>{item.label2}</span></Typography>

                                    </Box>
                                </Button>
                            ))}
                        </Box>
                    )}

                    {/* Right Side */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton color="inherit" onClick={toggleDarkMode}>
                            {darkMode ? <LightMode /> : <DarkMode />}
                        </IconButton>

                        <IconButton color="inherit" onClick={() => setNotifOpen(true)}>
                            <Badge badgeContent={unreadCount} color="secondary"><Notifications /></Badge>
                        </IconButton>

                        {isAuthenticated ? (
                            <>
                                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                                    <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32, fontSize: '0.9rem' }}>
                                        {user?.name?.[0] || 'U'}
                                    </Avatar>
                                </IconButton>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                                    <MenuItem disabled>
                                        <Typography variant="body2" fontWeight={700}>{user?.name}</Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => { setAnchorEl(null); navigate('/dashboard'); }}>
                                        <Dashboard sx={{ mr: 1, fontSize: 18 }} /> Dashboard
                                    </MenuItem>
                                    <MenuItem onClick={() => { setAnchorEl(null); navigate(`/profile/${user?._id}`); }}>
                                        <Avatar sx={{ width: 18, height: 18, mr: 1, fontSize: '0.6rem' }}>{user?.name?.[0]}</Avatar> Profile
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <Logout sx={{ mr: 1, fontSize: 18 }} /> Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            !isMobile && (
                                <Button color="inherit" startIcon={<Login />} onClick={() => navigate('/auth')}
                                    sx={{ textTransform: 'none', fontWeight: 600 }}>
                                    Login
                                </Button>
                            )
                        )}

                        {isMobile && (
                            <IconButton color="inherit" onClick={() => setMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} anchor="right">
                <Box sx={{ width: 280, p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" fontWeight={700}>Menu</Typography>
                        <IconButton onClick={() => setMobileOpen(false)}><Close /></IconButton>
                    </Box>
                    <List>
                        {navItems.map(item => (
                            <ListItem key={item.path} component={Link} to={item.path}
                                onClick={() => setMobileOpen(false)}
                                sx={{ borderRadius: 2, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                        <Divider sx={{ my: 1 }} />
                        {isAuthenticated ? (
                            <>
                                <ListItem component={Link} to="/dashboard" onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2, mb: 0.5 }}>
                                    <ListItemIcon><Dashboard /></ListItemIcon>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem onClick={() => { setMobileOpen(false); handleLogout(); }} sx={{ borderRadius: 2, cursor: 'pointer' }}>
                                    <ListItemIcon><Logout /></ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </>
                        ) : (
                            <ListItem component={Link} to="/auth" onClick={() => setMobileOpen(false)} sx={{ borderRadius: 2 }}>
                                <ListItemIcon><Login /></ListItemIcon>
                                <ListItemText primary="Login / Register" />
                            </ListItem>
                        )}
                    </List>
                </Box>
            </Drawer>

            <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} notifications={notifications} onMarkRead={markNotificationRead} />
        </>
    );
}
