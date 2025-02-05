import { User } from '../models/User';
import { redis } from '../database/redis';

export class MatchmakingService {
  private readonly queueKey = 'matchmaking:queue';

  async addToQueue(userId: string): Promise<string | null> {
    const queueLength = await redis.llen(this.queueKey);
    
    if (queueLength > 0) {
      const matchedUserId = await redis.lpop(this.queueKey);
      if (matchedUserId) return matchedUserId;
    }
    
    await redis.rpush(this.queueKey, userId);
    return null;
  }

  async removeFromQueue(userId: string): Promise<void> {
    await redis.lrem(this.queueKey, 0, userId);
  }
}