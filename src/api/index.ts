import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import emojis from './coffeeShop';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'COFFEE SHOP API',
  });
});

router.use('/coffeeshop/', emojis);

export default router;
