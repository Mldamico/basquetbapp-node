import { Router } from 'express';
import { beginMatch, endMatch } from '../controller/match.controller';

const router = Router();

router.post('/', beginMatch);
router.put('/end/:id', endMatch);

export default router;
