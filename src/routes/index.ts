import { Router } from 'express';
import { authRouter } from './auth';
import { customerRouter } from './customer';
import { authMiddleware } from '../middlewares/auth';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/customers', authMiddleware, customerRouter);

export default router;