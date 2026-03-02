import {
    Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText,
    IconButton, Badge, Chip, Divider,
} from '@mui/material';
import {
    Close, Gavel, LocalShipping, Info, Circle,
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const getIcon = (type) => {
    switch (type) {
        case 'bid': return <Gavel color="primary" />;
        case 'load': return <LocalShipping color="secondary" />;
        default: return <Info color="info" />;
    }
};

export default function NotificationDrawer({ open, onClose }) {
    const { notifications, markNotificationRead } = useApp();

    const handleClick = (id) => {
        markNotificationRead(id);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 360, p: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, pb: 1 }}>
                    <Typography variant="h6" fontWeight={700}>Notifications</Typography>
                    <IconButton onClick={onClose}><Close /></IconButton>
                </Box>
                <Divider />
                <List sx={{ p: 1 }}>
                    {notifications.length === 0 && (
                        <ListItem>
                            <ListItemText primary="No notifications yet" sx={{ textAlign: 'center', color: 'text.secondary' }} />
                        </ListItem>
                    )}
                    {notifications.map(notif => (
                        <ListItem
                            key={notif.id}
                            onClick={() => handleClick(notif.id)}
                            sx={{
                                borderRadius: 2, mb: 0.5, cursor: 'pointer',
                                bgcolor: notif.read ? 'transparent' : 'action.hover',
                                '&:hover': { bgcolor: 'action.selected' },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <Badge
                                    variant="dot"
                                    color="secondary"
                                    invisible={notif.read}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                >
                                    {getIcon(notif.type)}
                                </Badge>
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" fontWeight={notif.read ? 400 : 700}>
                                            {notif.title}
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                            {notif.message}
                                        </Typography>
                                        <Typography variant="caption" color="text.disabled" sx={{ mt: 0.5, display: 'block' }}>
                                            {notif.time}
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
