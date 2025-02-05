import { Server, Socket } from 'socket.io';
import { Chat } from '../models/Chat';
import { redis } from '../database/redis';

export class ChatService {
  constructor(private io: Server) {}

  async handleMessage(socket: Socket, message: string) {
    const userId = socket.data.userId;
    const roomId = await redis.get(`user:${userId}:room`);
    
    if (!roomId) return;

    const chat = await Chat.create({
      room: roomId,
      sender: userId,
      content: message
    });

    this.io.to(roomId).emit('message', {
      id: chat.id,
      sender: userId,
      content: message,
      timestamp: chat.createdAt
    });
  }

  async joinRoom(socket: Socket, roomId: string) {
    const userId = socket.data.userId;
    await redis.set(`user:${userId}:room`, roomId);
    socket.join(roomId);
  }
}