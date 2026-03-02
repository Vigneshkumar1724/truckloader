import express from 'express';
import Bid from '../models/Bid.js';
import Load from '../models/Load.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route POST /api/bids  (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const { load, amount, message } = req.body;

        // Check load exists and is open
        const loadDoc = await Load.findById(load);
        if (!loadDoc) return res.status(404).json({ message: 'Load not found' });
        if (loadDoc.status !== 'open') return res.status(400).json({ message: 'Load is not open for bids' });

        // Check if user already bid on this load
        const existingBid = await Bid.findOne({ load, bidder: req.user._id });
        if (existingBid) return res.status(400).json({ message: 'You already bid on this load' });

        const bid = await Bid.create({
            load, bidder: req.user._id, amount, message,
        });

        const populated = await bid.populate('bidder', 'name companyName rating verified');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/bids/load/:loadId  (bids for a specific load)
router.get('/load/:loadId', async (req, res) => {
    try {
        const bids = await Bid.find({ load: req.params.loadId })
            .populate('bidder', 'name companyName rating verified city')
            .sort({ createdAt: -1 });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/bids/my  (my bids, auth required)
router.get('/my', auth, async (req, res) => {
    try {
        const bids = await Bid.find({ bidder: req.user._id })
            .populate('load', 'from to material weight price status')
            .sort({ createdAt: -1 });

        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/bids/:id/status  (accept/reject, load owner only)
router.put('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Status must be accepted or rejected' });
        }

        const bid = await Bid.findById(req.params.id).populate('load');
        if (!bid) return res.status(404).json({ message: 'Bid not found' });

        // Only load owner can accept/reject
        if (bid.load.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        bid.status = status;
        await bid.save();

        // If accepted, mark load as assigned
        if (status === 'accepted') {
            await Load.findByIdAndUpdate(bid.load._id, { status: 'assigned' });
        }

        res.json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
