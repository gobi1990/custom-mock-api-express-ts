import express from 'express';
import { authenticateToken } from '../middlewares';
import { loginAdmin, registerAdmin } from '../controllers/adminAuthController';

const router = express.Router();

router.post('/adminregister', registerAdmin);
router.post('/adminlogin', authenticateToken, loginAdmin);

export default router;
