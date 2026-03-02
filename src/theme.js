import { createTheme } from '@mui/material/styles';

export const getTheme = (darkMode) => createTheme({
    palette: {
        mode: darkMode ? 'dark' : 'light',
        primary: {
            main: '#1a237e',
            light: '#534bae',
            dark: '#000051',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#f57c00',
            light: '#ffad42',
            dark: '#bb4d00',
            contrastText: '#000000',
        },
        ...(darkMode ? {
            background: {
                default: '#0a0e27',
                paper: '#121638',
            },
            text: {
                primary: '#e8eaf6',
                secondary: '#9fa8da',
            },
        } : {
            background: {
                default: '#f5f7ff',
                paper: '#ffffff',
            },
        }),
        success: { main: '#2e7d32' },
        warning: { main: '#ed6c02' },
        error: { main: '#d32f2f' },
        info: { main: '#0288d1' },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.02em' },
        h2: { fontWeight: 700, letterSpacing: '-0.01em' },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 600 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
        button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: { borderRadius: 12 },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '10px 24px',
                    fontSize: '0.95rem',
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                    boxShadow: '0 4px 15px rgba(26, 35, 126, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #283593 0%, #3949ab 100%)',
                        boxShadow: '0 6px 20px rgba(26, 35, 126, 0.4)',
                    },
                },
                containedSecondary: {
                    background: 'linear-gradient(135deg, #f57c00 0%, #ff9800 100%)',
                    boxShadow: '0 4px 15px rgba(245, 124, 0, 0.3)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #ff9800 0%, #ffa726 100%)',
                        boxShadow: '0 6px 20px rgba(245, 124, 0, 0.4)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 16,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 20px rgba(0, 0, 0, 0.4)'
                        : '0 4px 20px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 30px rgba(0, 0, 0, 0.6)'
                            : '0 8px 30px rgba(0, 0, 0, 0.15)',
                    },
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                root: { fontWeight: 500 },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0a0e27 0%, #121638 100%)'
                        : 'linear-gradient(135deg, #1a237e 0%, #283593 100%)',
                    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.15)',
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: { '& .MuiOutlinedInput-root': { borderRadius: 10 } },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: { borderRadius: 16 },
            },
        },
    },
});
