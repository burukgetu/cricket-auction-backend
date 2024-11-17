import mongoose from 'mongoose';

// Auction schema to represent an auction event
const auctionSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  auctionStatus: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  auctionEndTime: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);

export default Auction;
