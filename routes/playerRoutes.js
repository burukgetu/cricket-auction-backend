import express from 'express';
import { getPlayers, addPlayer, updatePlayer, deletePlayer, getPlayerById } from '../controllers/playerController.js';

const router = express.Router();

router.get('/', getPlayers);
router.get('/:id', getPlayerById);
router.post('/', addPlayer);
router.put('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router;