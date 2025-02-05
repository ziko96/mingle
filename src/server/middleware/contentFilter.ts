import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';

const BANNED_WORDS = ['inappropriate1', 'inappropriate2'];

export const contentFilter = (req: Request, res: Response, next: NextFunction) => {
  const content = req.body.message?.toLowerCase();
  if (!content) return next();

  const containsBannedWord = BANNED_WORDS.some(word => content.includes(word));
  if (containsBannedWord) {
    return next(new AppError(400, 'Message contains inappropriate content'));
  }

  next();
};