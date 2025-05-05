const mongoose = require('mongoose');

const joinAuctionSchema = new mongoose.Schema({
    participantName: String,
    place: String,
    phoneNo: Number,
    agreement: String,  // Store Yes/No for agreement
}, {
    timestamps: true,
});

const joinAuction = mongoose.model('joinAuction', joinAuctionSchema);

module.exports = joinAuction;
