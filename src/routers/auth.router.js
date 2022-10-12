import express from 'express';
import { singIn, singUp } from '../controllers/auth.controller.js';
import { validateSignIn, validateSignUp } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', validateSignUp, singUp);
router.post('/signin', validateSignIn, singIn);

export default router;