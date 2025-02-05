import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '../database/redis';

export const apiLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args)
  }),
  windowMs: 15 * 60 * 1000,
  max: 100
});

export const authLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redis.call(...args)
  }),
  windowMs: 60 * 60 * 1000,
  max: 5
});