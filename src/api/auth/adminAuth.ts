import express from 'express';
import { authenticateToken } from '../../middlewares';
import { registerAdmin, loginAdmin } from '../../controllers/adminAuthController';
import MessageResponse from '../../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Register & Login API Endpoints',
  });
});

router.post('/register', registerAdmin);
router.post('/login', authenticateToken, loginAdmin);

export default router;
