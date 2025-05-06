const mongoose = require('mongoose');

const addAuctionSchema = new mongoose.Schema({
    name: String,
    timing: String,
    entryAmount: Number,
    startDate: Date,
    time: String,
    participants: Number,
    productList: String,
    description: String, // <-- Add this line
    imageUrl: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Auction = mongoose.model('newAuction', addAuctionSchema);

module.exports = Auction;
