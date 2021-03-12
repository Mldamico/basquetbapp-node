import { Router } from 'express';
import { createPlayer, getPlayers } from '../controller/user.controller';

const router = Router();

router.get('/', getPlayers);
router.post('/', createPlayer);

export default router;
