import express from 'express';
import { getPromotions, getSupabasePromotions } from '../controllers/coffeeShopController';

const router = express.Router();

router.get('/getmockpromotions', getPromotions);
router.get('/getdbpromotions', getSupabasePromotions);

export default router;
