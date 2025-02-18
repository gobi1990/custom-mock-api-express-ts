import express from 'express';
import { getPromotions, getSupabasePromotions } from '../controllers/coffeeShopController';
import { authenticateToken } from '../middlewares';

const router = express.Router();

router.get('/getmockpromotions', authenticateToken , getPromotions);
router.get('/getdbpromotions', authenticateToken , getSupabasePromotions);

export default router;
