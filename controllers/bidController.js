import Bid from '../models/Bid.js';
import Auction from '../models/Auction.js';
import User from '../models/User.js';

// Place a bid
export const placeBid = async (req, res) => {
  const { auctionId, userId, bidAmount } = req.body;

  try {
    // Find the auction
    const auction = await Auction.findById(auctionId);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Check if the bid amount is higher than the current bid
    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current bid' });
    }

    // Create the bid
    const newBid = new Bid({
      auctionId,
      userId,
      bidAmount,
    });

    // Save the bid
    await newBid.save();

    // Update the auction's current bid and highest bidder
    auction.currentBid = bidAmount;
    auction.highestBidder = userId; // Set highest bidder to the current user
    await auction.save();

    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing bid
export const updateBid = async (req, res) => {
    const { bidId } = req.params;
    const { bidAmount } = req.body;
  
    try {
      // Find the bid
      const bid = await Bid.findById(bidId);
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }
  
      // Check if the new bid is higher than the current bid
      const auction = await Auction.findById(bid.auctionId);
      if (bidAmount <= auction.currentBid) {
        return res.status(400).json({ message: 'Bid amount must be higher than the current bid' });
      }
  
      // Update the bid amount
      bid.bidAmount = bidAmount;
      await bid.save();
  
      // Update the auction's current bid and highest bidder
      auction.currentBid = bidAmount;
      auction.highestBidder = bid.userId; // Update highest bidder to the current user
      await auction.save();
  
      res.status(200).json(bid);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete a bid
export const deleteBid = async (req, res) => {
    const { bidId } = req.params;
  
    try {
      // Find the bid
      const bid = await Bid.findById(bidId);
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }
  
      // Delete the bid
      await bid.deleteOne()
  
      // Recalculate the auction's current bid and highest bidder
      const auction = await Auction.findById(bid.auctionId);
      if (auction) {
        // Find the highest bid from remaining bids
        const highestBid = await Bid.findOne({ auctionId: auction._id })
          .sort({ bidAmount: -1 }) // Sort by bidAmount in descending order
          .limit(1);
  
        if (highestBid) {
          auction.currentBid = highestBid.bidAmount;
          auction.highestBidder = highestBid.userId;
        } else {
          auction.currentBid = 0;
          auction.highestBidder = null;
        }
        await auction.save();
      }
  
      res.status(200).json({ message: 'Bid deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Get all bids for a specific auction
export const getBidsByAuctionId = async (req, res) => {
const { auctionId } = req.params;

try {
    // Find bids related to the auctionId
    const bids = await Bid.find({ auctionId })
    .populate('userId', 'name email') // Populate user data (optional)
    .sort({ bidAmount: -1 }); // Sort bids by bid amount in descending order

    if (!bids || bids.length === 0) {
    return res.status(404).json({ message: 'No bids found for this auction' });
    }

    res.status(200).json(bids);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};

export const getBidsByUserId = async (req, res) => {
    const { userId, auctionId } = req.params;
  
    try {
      // Find bids related to the userId
      const bids = await Bid.find({ userId, auctionId })
        .populate('auctionId', 'playerId currentBid auctionEndTime') // Populate auction data (optional)
        .sort({ bidAmount: -1 }); // Sort bids by bid amount in descending order
  
      if (!bids || bids.length === 0) {
        return res.status(404).json({ message: 'No bids found for this user' });
      }
  
      res.status(200).json(bids);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };