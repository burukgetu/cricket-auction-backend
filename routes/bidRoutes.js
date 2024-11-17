import express from 'express';
import { placeBid, updateBid, deleteBid, getBidsByAuctionId, getBidsByUserId } from '../controllers/bidController.js';

const router = express.Router();

router.post('/', placeBid);
router.put('/:bidId', updateBid);
router.delete('/:bidId', deleteBid);
router.get('/:auctionId', getBidsByAuctionId);
router.get('/user/:auctionId/:userId', getBidsByUserId)

export default router;