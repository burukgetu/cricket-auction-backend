import mongoose from 'mongoose';

// Bid schema to represent bids placed during the auction
const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming we have a User model
    required: true,
  },
  bidAmount: {
    type: Number,
    required: true,
  },
  bidTime: {
    type: Date,
    default: Date.now,
  },
});

const Bid = mongoose.model('Bid', bidSchema);

export default Bid;
