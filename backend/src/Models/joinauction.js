const mongoose = require('mongoose');

const joinAuctionSchema = new mongoose.Schema({
  secretToken: String,
  participantName: String,
  place: String,
  phoneNo: String,
  agreement: String,
  auctionName: String,
  auctionId: String
}, {
  timestamps: true
});

const joinAuction = mongoose.model('joinAuction', joinAuctionSchema); 

module.exports = joinAuction;
