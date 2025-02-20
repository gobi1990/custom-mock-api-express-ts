import express from 'express';
import { authenticateToken, checkApiKey } from '../../middlewares/auth';
import { registerAdmin, loginAdmin } from '../../controllers/adminAuthController';
import MessageResponse from '../../interfaces/MessageResponse';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Register & Login API Endpoints',
  });
});

router.post('/register', checkApiKey, registerAdmin);
router.post('/login', checkApiKey,  loginAdmin);

export default router;
