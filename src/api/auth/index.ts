import express from 'express';
import MessageResponse from '../../interfaces/MessageResponse';
import adminAuth from './adminAuth';


const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Admin Auth API - Register & Login',
  });
});

router.use('/admins', adminAuth);

export default router;
