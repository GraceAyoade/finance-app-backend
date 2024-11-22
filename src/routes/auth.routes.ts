import express from 'express';
import { logIn, signUp } from '../controllers/authController';

const authRouter = express.Router();
authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);

export default authRouter;
