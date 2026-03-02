import { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, Box, Slider, Alert,
} from '@mui/material';
import { Gavel, CurrencyRupee } from '@mui/icons-material';

export default function BidDialog({ open, onClose, load, onSubmit }) {
    const [amount, setAmount] = useState(load?.price || 0);
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        onSubmit({ amount, message });
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setMessage('');
            onClose();
        }, 1500);
    };

    if (!load) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Gavel color="primary" />
                <Typography variant="h6" fontWeight={700}>Place Your Bid</Typography>
            </DialogTitle>
            <DialogContent>
                {submitted ? (
                    <Alert severity="success" sx={{ my: 2 }}>
                        Bid submitted successfully! The shipper will review your bid.
                    </Alert>
                ) : (
                    <>
                        <Box sx={{ mb: 3, p: 2, borderRadius: 2, bgcolor: 'action.hover' }}>
                            <Typography variant="body2" color="text.secondary">
                                Load: {load.from} → {load.to}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Material: {load.material} | Weight: {load.weight} Ton
                            </Typography>
                            <Typography variant="body2" fontWeight={600} color="secondary.main">
                                Expected Price: ₹{load.price?.toLocaleString('en-IN')}
                            </Typography>
                        </Box>

                        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
                            Your Bid Amount
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <CurrencyRupee color="action" />
                            <TextField
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                fullWidth
                                size="small"
                            />
                        </Box>

                        <Slider
                            value={amount}
                            onChange={(_, val) => setAmount(val)}
                            min={Math.floor(load.price * 0.5)}
                            max={Math.floor(load.price * 1.5)}
                            step={500}
                            sx={{ mb: 3 }}
                            color="secondary"
                        />

                        <TextField
                            label="Message to shipper (optional)"
                            multiline
                            rows={3}
                            fullWidth
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g., I have a container ready in Delhi. Can pick up tomorrow."
                        />
                    </>
                )}
            </DialogContent>
            {!submitted && (
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={handleSubmit} startIcon={<Gavel />}>
                        Submit Bid
                    </Button>
                </DialogActions>
            )}
        </Dialog>
    );
}
