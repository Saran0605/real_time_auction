import mongoose from 'mongoose';

const joinAuctionSchema = new mongoose.Schema({
  secretToken: String,
  participantName: String,
  place: String,
  phoneNo: String,
  agreement: String,
  auctionName: String,
  auctionId: String,
  auctionDescription: String
}, {
  timestamps: true
});

const joinAuction = mongoose.model('joinAuction', joinAuctionSchema);

export default joinAuction;
