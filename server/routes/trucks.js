import express from 'express';
import Truck from '../models/Truck.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route GET /api/trucks  (list with filters)
router.get('/', async (req, res) => {
    try {
        const { city, type, available, page = 1, limit = 20 } = req.query;
        const filter = {};

        if (city) filter.currentCity = { $regex: city, $options: 'i' };
        if (type) filter.type = type;
        if (available === 'true') filter.isAvailable = true;

        const total = await Truck.countDocuments(filter);
        const trucks = await Truck.find(filter)
            .populate('owner', 'name companyName rating verified city phone')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({ trucks, total, page: Number(page), pages: Math.ceil(total / limit) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/trucks/:id
router.get('/:id', async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id)
            .populate('owner', 'name companyName rating verified city phone email fleetSize totalLoads gstNumber reviews');

        if (!truck) return res.status(404).json({ message: 'Truck not found' });
        res.json(truck);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST /api/trucks  (auth required)
router.post('/', auth, async (req, res) => {
    try {
        const { type, make, model, registrationNo, capacity, currentCity, availableRoutes } = req.body;

        const truck = await Truck.create({
            owner: req.user._id,
            type, make, model, registrationNo, capacity, currentCity, availableRoutes,
        });

        const populated = await truck.populate('owner', 'name companyName rating verified city');
        res.status(201).json(populated);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Truck with this registration number already exists' });
        }
        res.status(500).json({ message: error.message });
    }
});

// @route PUT /api/trucks/:id  (auth, owner only)
router.put('/:id', auth, async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id);
        if (!truck) return res.status(404).json({ message: 'Truck not found' });
        if (truck.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        Object.assign(truck, req.body);
        await truck.save();
        res.json(truck);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route DELETE /api/trucks/:id
router.delete('/:id', auth, async (req, res) => {
    try {
        const truck = await Truck.findById(req.params.id);
        if (!truck) return res.status(404).json({ message: 'Truck not found' });
        if (truck.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await truck.deleteOne();
        res.json({ message: 'Truck deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
