import { Router } from 'express';
import { createGame, getGame, listGames } from '../controllers/gameController.js';

const router = Router();
router.get('/', listGames);
router.get('/:id', getGame);
router.post('/', createGame);
export default router;
