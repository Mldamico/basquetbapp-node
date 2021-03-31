import { Router } from 'express';
import {
  createPlay,
  getPlayById,
  getPlays,
  searchPlay,
} from '../controller/play.controller';

const router = Router();

router.post('/', createPlay);
router.get('/', getPlays);
router.get('/:id', getPlayById);
router.get('/search/:nombre', searchPlay);

export default router;
