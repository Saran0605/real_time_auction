import mongoose from 'mongoose';

const finalBidSchema = new mongoose.Schema({
    auctionId: String,
    bidderName: String,
    finalAmount: Number,
    auctionName: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('FinalBid', finalBidSchema);
