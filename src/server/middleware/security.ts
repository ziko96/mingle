import rateLimit from 'express-rate-limit';
import { sanitize } from 'isomorphic-dompurify';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitize(req.body[key]);
      }
    });
  }
  next();
};

export const corsConfig = cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
});