import { Redis } from 'ioredis';
import { logger } from '../utils/logger';

export const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true
});

redis.on('error', (error) => {
  logger.error('Redis error:', error);
});