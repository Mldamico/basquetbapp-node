import { Router } from 'express';
import { register, login, createAssist } from '../controller/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/register-assist', createAssist);
export default router;
