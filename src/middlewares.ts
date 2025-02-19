import { NextFunction, Request, Response } from 'express';
import ErrorResponse from './interfaces/ErrorResponse';
import jwt , { JwtPayload } from 'jsonwebtoken';
import { supabase } from './config/supabase';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string; role: string };
}

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
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
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload; 

      if (!decoded.id) {
          return res.status(401).json({ error: 'Invalid token payload' });
      }

      // Validate token with database
      const { data, error } = await supabase
          .from('adminusers')
          .select('id, email, role, token')
          .eq('id', decoded.id)
          .single();

      if (error || !data || data.token !== token) {
          return res.status(403).json({ error: 'Invalid or expired token' });
      }

      // Attach user info to request
      req.user = { id: data.id, email: data.email, role: data.role };
      next();
  } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
