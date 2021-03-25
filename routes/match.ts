import { Router } from 'express';
import { beginMatch } from '../controller/match.controller';

const router = Router();

router.post('/', beginMatch);

export default router;
