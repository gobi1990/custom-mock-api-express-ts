import { Request, Response } from 'express';
import { PromotionResponse } from '../interfaces/PromotionResponse';

export const getPromotions = (req: Request, res: Response<PromotionResponse>) => {
  res.json({
    status: 'success',
    data: {
      'promotions': [
        {
          'id': 'COFFEE_PR_01',
          'title': 'Morning Brew Special',
          'description': 'Get 20% off on all espresso drinks from 7 AM to 10 AM.',
          'discount': '20%',
          'start_time': '07:00',
          'end_time': '10:00',
          'valid_until': '2025-03-31',
          'image_url': 'https://shorturl.at/ATkWc',
        },
        {
          'id': 'COFFEE_PR_02',
          'title': 'Buy 1 Get 1 Free - Latte Tuesday',
          'description': 'Order a large latte and get another one free every Tuesday.',
          'discount': 'Buy 1 Get 1 Free',
          'start_time': 'All Day',
          'end_time': 'All Day',
          'valid_until': '2025-04-30',
          'image_url': 'https://shorturl.at/ATkWc',
        },
        {
          'id': 'COFFEE_PR_03',
          'title': 'Happy Hour Coffee',
          'description': 'Flat 30% off on all cold brews from 4 PM to 6 PM.',
          'discount': '30%',
          'start_time': '16:00',
          'end_time': '18:00',
          'valid_until': '2025-05-15',
          'image_url': 'https://shorturl.at/ATkWc',
        },   
      ],
    },
  });
};
