import { Socket } from 'socket.io';
import * as mediasoup from 'mediasoup';

export class WebRTCService {
  private worker: mediasoup.types.Worker;
  private router: mediasoup.types.Router;
  private producers = new Map<string, mediasoup.types.Producer>();
  private consumers = new Map<string, mediasoup.types.Consumer>();

  async initialize() {
    this.worker = await mediasoup.createWorker({
      logLevel: 'warn',
      rtcMinPort: Number(process.env.MEDIASOUP_MIN_PORT) || 10000,
      rtcMaxPort: Number(process.env.MEDIASOUP_MAX_PORT) || 10100
    });

    this.router = await this.worker.createRouter({
      mediaCodecs: [
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000
        },
        {
          kind: 'audio',
          mimeType: 'audio/opus',
          clockRate: 48000,
          channels: 2
        }
      ]
    });
  }

  async handleConnection(socket: Socket) {
    const transport = await this.createWebRtcTransport();
    socket.emit('rtcTransport', {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters
    });
  }

  private async createWebRtcTransport() {
    return await this.router.createWebRtcTransport({
      listenIps: [{ ip: process.env.MEDIASOUP_LISTEN_IP || '127.0.0.1' }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true
    });
  }
}