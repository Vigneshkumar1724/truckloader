import express from 'express';
import Load from '../models/Load.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/loads  (list with filters)
router.get('/', async (req, res) => {
    try {
        const { from, to, truckType, status, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (from) filter.from = { $regex: from, $options: 'i' };
        if (to) filter.to = { $regex: to, $options: 'i' };
        if (truckType) filter.truckType = truckType;
        if (status) filter.status = status;

        const total = await Load.countDocuments(filter);
        const loads = await Load.find(filter)
            .populate('postedBy', 'name companyName rating verified city phone')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({ loads, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/loads/:id
router.get('/:id', async (req, res) => {
    try {
        const load = await Load.findById(req.params.id)
            .populate('postedBy', 'name companyName rating verified city phone email fleetSize totalLoads gstNumber reviews');

        if (!load) return res.status(404).json({ message: 'Load not found' });
        res.json(load);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST /api/loads  (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const { from, to, material, weight, truckType, price, pickupTime, description, contact } = req.body;

        const load = await Load.create({
            postedBy: req.user._id,
            from, to, material, weight, truckType, price, pickupTime, description, contact,
        });

        const populated = await load.populate('postedBy', 'name companyName rating verified city');
        res.status(201).json(populated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/loads/:id  (auth, owner only)
router.put('/:id', auth, async (req, res) => {
    try {
        const load = await Load.findById(req.params.id);
        if (!load) return res.status(404).json({ message: 'Load not found' });
        if (load.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(load, req.body);
        await load.save();
        res.json(load);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route DELETE /api/loads/:id  (auth, owner only)
router.delete('/:id', auth, async (req, res) => {
    try {
        const load = await Load.findById(req.params.id);
        if (!load) return res.status(404).json({ message: 'Load not found' });
        if (load.postedBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await load.deleteOne();
        res.json({ message: 'Load deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
