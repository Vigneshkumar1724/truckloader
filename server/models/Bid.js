import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
    load: { type: mongoose.Schema.Types.ObjectId, ref: 'Load', required: true },
    bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 },
    message: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model('Bid', bidSchema);
