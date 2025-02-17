import express from 'express';
import { getPromotions } from '../controllers/coffeeShopController';

const router = express.Router();

router.get('/getPromotions', getPromotions);

export default router;
