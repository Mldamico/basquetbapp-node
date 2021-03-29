import { Router } from 'express';
import {
  createPlay,
  getPlayById,
  getPlays,
} from '../controller/play.controller';

const router = Router();

router.post('/', createPlay);
router.get('/', getPlays);
router.get('/:id', getPlayById);

export default router;
