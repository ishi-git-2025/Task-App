import express, { Router } from 'express';
import {loginUser, registerUser, logoutUser, getUser, userLoginStatus } from '../controllers/auth/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/user', protect, getUser); // to ensure that only authenticated users can access the /user route
router.get("/login-status", userLoginStatus);
export default router;