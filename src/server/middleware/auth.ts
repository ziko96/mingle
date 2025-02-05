import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppError } from '../utils/error';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new AppError(401, 'Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) throw new AppError(401, 'User not found');

    req.user = user;
    next();
  } catch (error) {
    next(new AppError(401, 'Authentication failed'));
  }
};