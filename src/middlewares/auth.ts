import { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key']; 

  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
      return res.status(403).json({ error: 'Unauthorized access: Invalid API Key' });
  }

  next(); 
};

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
      return res.status(403).json({ error: 'Access denied. No token provided.' });
  }

  try {
      
      // Validate token with database
      const { data, error } = await supabase
            .from(process.env.USER_TOKENS_TABLE || 'usertokens')
            .select('token, user_id')
            .eq('token', token)
            .single();

      if (error || !data || data.token !== token) {
          return res.status(403).json({ error: 'Invalid or expired token' });
      }

      next();
  } catch (err) {
      res.status(401).json({ error: `Invalid token ${token}` });
  }
};