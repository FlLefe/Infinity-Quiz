/* eslint-disable import/extensions */
import { Router } from 'express';

import quizRouter from './quiz.js';
import userRouter from './user.js';
import adminRouter from './admin.js';

import errorHandler from '../services/error/errorHandler.js';
import { isMember, isAdmin } from '../services/auth/security.js';

const router = Router();

router.use('/v1/quiz', quizRouter);
router.use('/v1/user', userRouter);
router.use('/v1/admin', isMember, isAdmin, adminRouter);

router.use(errorHandler);

export default router;
