import mongoose from 'mongoose';

const loadSchema = new mongoose.Schema({
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    material: { type: String, required: true, trim: true },
    weight: { type: Number, required: true, min: 0 },
    truckType: {
        type: String,
        required: true,
        enum: ['open_body', 'container', 'trailer', 'flatbed', 'tanker', 'lcv', 'hcv', 'tipper'],
    },
    price: { type: Number, required: true, min: 0 },
    pickupTime: { type: Date },
    description: { type: String, trim: true },
    contact: { type: String, trim: true },
    status: { type: String, enum: ['open', 'assigned', 'completed'], default: 'open' },
}, { timestamps: true });

// Virtual: populate bids for this load
loadSchema.virtual('bids', {
    ref: 'Bid',
    localField: '_id',
    foreignField: 'load',
});

loadSchema.set('toJSON', { virtuals: true });
loadSchema.set('toObject', { virtuals: true });

export default mongoose.model('Load', loadSchema);
