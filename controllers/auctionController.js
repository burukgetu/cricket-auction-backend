// controllers/auctionController.js
import Auction from '../models/Auction.js';
import Player from '../models/Player.js';

export const getAllAuctions = async (req, res) => {
  try {
    const auctions = await Auction.find()
      .populate('playerId', 'name role') // Populates player details (name and role)
      .populate('highestBidder', 'username email'); // Populates highest bidder details (username and email)

    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuctionById = async (req, res) => {
  const { id } = req.params; // Auction ID from the URL

  try {
    const auction = await Auction.findById(id)
      .populate('playerId', 'name role') // Populates player details (name and role)
      .populate('highestBidder', 'username email'); // Populates highest bidder details (username and email)

    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAuction = async (req, res) => {
  const { playerId, auctionEndTime, startingBid } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const existingAuction = await Auction.findOne({ playerId });
    if (existingAuction) {
      return res.status(400).json({ message: 'Auction already exists for this player' });
    }

    const newAuction = new Auction({
      playerId,
      auctionEndTime,
      currentBid: startingBid || 0,
    });
    
    await newAuction.save();
    res.status(201).json(newAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAuction = async (req, res) => {
  const { id } = req.params; // Auction ID from the URL
  const { auctionEndTime, currentBid, auctionStatus, highestBidder } = req.body;

  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    // Update auction fields if provided
    if (auctionEndTime) auction.auctionEndTime = auctionEndTime;
    if (currentBid) auction.currentBid = currentBid;
    if (auctionStatus) auction.auctionStatus = auctionStatus;
    if (highestBidder) auction.highestBidder = highestBidder;

    // Save updated auction
    const updatedAuction = await auction.save();

    res.status(200).json(updatedAuction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAuction = async (req, res) => {
  const { id } = req.params; // Auction ID from the URL

  try {
    const auction = await Auction.findById(id);
    if (!auction) {
      return res.status(404).json({ message: 'Auction not found' });
    }

    await auction.deleteOne(); // Deletes the auction from the database
    res.status(200).json({ message: 'Auction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Place a bid on a player
export const placeBid = async (req, res) => {
  const { playerId, bidAmount } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: 'Player not found' });

    if (bidAmount <= player.price) {
      return res.status(400).json({ message: 'Bid must be higher than the current price' });
    }

    player.price = bidAmount; // Update player price with the new bid
    player.isAvailable = false; // Mark player as sold
    await player.save();

    res.status(200).json({ message: 'Bid placed successfully', player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sold players
export const getSoldPlayers = async (req, res) => {
  try {
    const soldPlayers = await Player.find({ isAvailable: false });
    res.status(200).json(soldPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
