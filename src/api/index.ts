import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import coffeeshop from './coffeeShop';
import auth from './auth';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'COFFEE SHOP API',
  });
});

router.use('/coffeeshop/', coffeeshop);
router.use('/auth/', auth);   

export default router;
