import express from 'express';
import { singIn, singUp } from '../controllers/auth.controller.js';
import { validateSignUp } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', validateSignUp, singUp);
router.post('/signin', singIn);

export default router;