import { Router } from 'express';
import { getPlayers } from '../controller/user.controller';

const router = Router();

router.get('/', getPlayers);

export default router;
