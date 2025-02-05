import { Socket } from 'socket.io';
import { VideoService } from './VideoService';
import { logger } from '../utils/logger';
import { redis } from '../database/redis';

export class SignalingService {
  private videoService: VideoService;

  constructor() {
    this.videoService = new VideoService();
  }

  async initialize() {
    await this.videoService.initialize();
  }

  handleConnection(socket: Socket) {
    socket.on('getRouterRtpCapabilities', (callback) => {
      callback(this.videoService.getRtpCapabilities());
    });

    socket.on('createTransport', async (callback) => {
      try {
        const transport = await this.videoService.createTransport(socket.id);
        callback({
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters
        });
      } catch (error) {
        callback({ error: error.message });
      }
    });

    socket.on('connectTransport', async ({ dtlsParameters }, callback) => {
      try {
        await this.videoService.connectTransport(socket.id, dtlsParameters);
        callback({ success: true });
      } catch (error) {
        callback({ error: error.message });
      }
    });

    socket.on('produce', async ({ kind, rtpParameters }, callback) => {
      try {
        const producer = await this.videoService.produce(socket.id, kind, rtpParameters);
        callback({ id: producer.id });
      } catch (error) {
        callback({ error: error.message });
      }
    });

    socket.on('consume', async ({ producerId, rtpCapabilities }, callback) => {
      try {
        const consumer = await this.videoService.consume(socket.id, producerId, rtpCapabilities);
        callback({
          id: consumer.id,
          producerId: consumer.producerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters
        });
      } catch (error) {
        callback({ error: error.message });
      }
    });

    socket.on('join-room', async (roomId: string) => {
      try {
        await this.handleJoinRoom(socket, roomId);
      } catch (error) {
        logger.error('Join room error:', error);
        socket.emit('error', { message: 'Failed to join room' });
      }
    });

    socket.on('disconnect', () => {
      this.handleDisconnect(socket);
    });
  }

  private async handleJoinRoom(socket: Socket, roomId: string) {
    const transport = await this.videoService.createTransport(socket.id);
    socket.join(roomId);
    socket.emit('transport-created', {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters
    });
  }

  private handleDisconnect(socket: Socket) {
    this.videoService.cleanup(socket.id);
  }
}