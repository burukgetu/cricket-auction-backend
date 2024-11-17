import express from 'express';
import { getPlayers, addPlayer, updatePlayer, deletePlayer } from '../controllers/playerController.js';

const router = express.Router();

router.get('/', getPlayers);
router.post('/', addPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router;