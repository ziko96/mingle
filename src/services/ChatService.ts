import { Socket } from 'socket.io';
import { redisClient } from '../config/redis';
import { RoomManager } from './RoomManager';

export class ChatService {
  constructor(
    private socket: Socket,
    private roomManager: RoomManager
  ) {}

  // Chat methods implementation
}