import mongoose from 'mongoose';

const truckSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        required: true,
        enum: ['open_body', 'container', 'trailer', 'flatbed', 'tanker', 'lcv', 'hcv', 'tipper'],
    },
    make: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    registrationNo: { type: String, required: true, unique: true, trim: true },
    capacity: { type: Number, required: true, min: 0 },
    currentCity: { type: String, required: true, trim: true },
    availableRoutes: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    tripsCompleted: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Truck', truckSchema);
