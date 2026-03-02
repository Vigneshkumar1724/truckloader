import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export default function StatsCounter({ end, label, prefix = '', suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const startTime = Date.now();
                    const animate = () => {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration, hasAnimated]);

    return (
        <Box ref={ref} sx={{ textAlign: 'center', p: 2 }}>
            <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                    background: 'linear-gradient(135deg, #f57c00, #ff9800)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5,
                }}
            >
                {prefix}{count.toLocaleString('en-IN')}{suffix}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {label}
            </Typography>
        </Box>
    );
}
