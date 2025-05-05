const mongoose = require('mongoose');

const joinAuctionSchema = new mongoose.Schema({
  secretToken: String,
  participantName: String,
  place: String,
  phoneNo: Number,
  agreement: String
}, {
  timestamps: true
});

const joinAuction = mongoose.model('joinAuction', joinAuctionSchema); 

module.exports = joinAuction;
