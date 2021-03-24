import { Router } from 'express';
import {
  activatePlayer,
  getPlayers,
  deactivatePlayer,
} from '../controller/user.controller';

const router = Router();

router.get('/', getPlayers);
router.put('/activate/:id', activatePlayer);
router.put('/deactivate/:id', deactivatePlayer);
export default router;
