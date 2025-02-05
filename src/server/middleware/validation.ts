import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AppError } from '../utils/error';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    userSchema.parse(req.body);
    next();
  } catch (error) {
    next(new AppError(400, 'Invalid input'));
  }
};