// routes/auctionRoutes.js
import express from 'express';
import { createAuction, placeBid, getSoldPlayers, deleteAuction, updateAuction, getAllAuctions, getAuctionById } from '../controllers/auctionController.js';
import checkAdmin from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin routes
router.get('/', getAllAuctions);
router.get('/:id', getAuctionById);
router.post('/add', checkAdmin, createAuction);
router.put('/:id', checkAdmin, updateAuction);
router.delete('/:id', checkAdmin, deleteAuction);

export default router;
