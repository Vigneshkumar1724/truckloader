import express from 'express';
import User from '../models/User.js';
import Load from '../models/Load.js';
import Truck from '../models/Truck.js';
import Bid from '../models/Bid.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/users/:id  (public profile)
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/users/:id/trucks  (user's fleet)
router.get('/:id/trucks', async (req, res) => {
    try {
        const trucks = await Truck.find({ owner: req.params.id })
            .sort({ createdAt: -1 });
        res.json(trucks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/users/:id/loads  (user's posted loads)
router.get('/:id/loads', async (req, res) => {
    try {
        const loads = await Load.find({ postedBy: req.params.id })
            .sort({ createdAt: -1 });
        res.json(loads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/dashboard  (auth, personal stats)
router.get('/', auth, async (req, res) => {
    try {
        const userId = req.user._id;

        const [myLoads, myTrucks, myBids] = await Promise.all([
            Load.find({ postedBy: userId }),
            Truck.find({ owner: userId }),
            Bid.find({ bidder: userId }).populate('load', 'from to material weight price status'),
        ]);

        const stats = {
            totalLoads: myLoads.length,
            openLoads: myLoads.filter(l => l.status === 'open').length,
            totalTrucks: myTrucks.length,
            availableTrucks: myTrucks.filter(t => t.isAvailable).length,
            totalBids: myBids.length,
            wonBids: myBids.filter(b => b.status === 'accepted').length,
            pendingBids: myBids.filter(b => b.status === 'pending').length,
            totalRevenue: myBids.filter(b => b.status === 'accepted').reduce((s, b) => s + b.amount, 0),
        };

        res.json({
            stats,
            recentLoads: myLoads.slice(0, 5),
            recentBids: myBids.slice(0, 5),
            trucks: myTrucks,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
