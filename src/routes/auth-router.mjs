import express from 'express';
import {getMe, postLogin} from '../controllers/auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';

const authRouter = express.Router();

authRouter
  // user login
  .post('/login', postLogin)
  // get user info
  .get('/me', authenticateToken, getMe);

export default authRouter;
