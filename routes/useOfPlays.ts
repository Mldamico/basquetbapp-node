import { Router } from 'express';
import { registerPlay } from '../controller/useOfPlays.controller';
const router = Router();
router.post('/', registerPlay);

export default router;
