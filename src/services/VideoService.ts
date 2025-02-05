import * as mediasoup from 'mediasoup';
import { WebRtcTransport } from 'mediasoup/node/lib/WebRtcTransport';
import { Producer } from 'mediasoup/node/lib/Producer';
import { Consumer } from 'mediasoup/node/lib/Consumer';
import { RtpCapabilities } from 'mediasoup/node/lib/RtpParameters';
import { Worker } from 'mediasoup/node/lib/Worker';

export class VideoService {
  private worker: Worker;
  private router: mediasoup.types.Router;
  private transports: Map<string, WebRtcTransport>;
  private producers: Map<string, Producer>;
  private consumers: Map<string, Consumer>;

  constructor() {
    this.transports = new Map();
    this.producers = new Map();
    this.consumers = new Map();
  }

  async initialize() {
    // Create mediasoup worker
    this.worker = await mediasoup.createWorker({
      logLevel: 'warn',
      rtcMinPort: 10000,
      rtcMaxPort: 10100
    });

    // Create mediasoup router
    this.router = await this.worker.createRouter({
      mediaCodecs: [
        {
          kind: 'video',
          mimeType: 'video/VP8',
          clockRate: 90000,
          parameters: {
            'x-google-start-bitrate': 1000
          }
        },
        {
          kind: 'video',
          mimeType: 'video/H264',
          clockRate: 90000,
          parameters: {
            'packetization-mode': 1,
            'profile-level-id': '42e01f',
            'level-asymmetry-allowed': 1
          }
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

  async createTransport(peerId: string): Promise<WebRtcTransport> {
    const transport = await this.router.createWebRtcTransport({
      listenIps: [{ ip: process.env.MEDIASOUP_LISTEN_IP || '127.0.0.1' }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      initialAvailableOutgoingBitrate: 1000000
    });

    this.transports.set(peerId, transport);

    return transport;
  }

  async connectTransport(peerId: string, dtlsParameters: mediasoup.types.DtlsParameters) {
    const transport = this.transports.get(peerId);
    if (!transport) throw new Error('Transport not found');
    
    await transport.connect({ dtlsParameters });
  }

  async produce(peerId: string, kind: 'audio' | 'video', rtpParameters: mediasoup.types.RtpParameters): Promise<Producer> {
    const transport = this.transports.get(peerId);
    if (!transport) throw new Error('Transport not found');

    const producer = await transport.produce({
      kind,
      rtpParameters
    });

    this.producers.set(producer.id, producer);

    producer.on('transportclose', () => {
      this.producers.delete(producer.id);
    });

    return producer;
  }

  async consume(peerId: string, producerId: string, rtpCapabilities: RtpCapabilities): Promise<Consumer> {
    const transport = this.transports.get(peerId);
    if (!transport) throw new Error('Transport not found');

    const producer = this.producers.get(producerId);
    if (!producer) throw new Error('Producer not found');

    if (!this.router.canConsume({ producerId, rtpCapabilities })) {
      throw new Error('Cannot consume');
    }

    const consumer = await transport.consume({
      producerId,
      rtpCapabilities,
      paused: true // Start paused and resume after handling the 'resume' event
    });

    this.consumers.set(consumer.id, consumer);

    consumer.on('transportclose', () => {
      this.consumers.delete(consumer.id);
    });

    consumer.on('producerclose', () => {
      this.consumers.delete(consumer.id);
    });

    return consumer;
  }

  async closeTransport(peerId: string) {
    const transport = this.transports.get(peerId);
    if (transport) {
      await transport.close();
      this.transports.delete(peerId);
    }
  }

  getRtpCapabilities(): RtpCapabilities {
    return this.router.rtpCapabilities;
  }

  async cleanup(peerId: string) {
    await this.closeTransport(peerId);
    
    // Cleanup producers
    for (const [producerId, producer] of this.producers.entries()) {
      if (producer.appData.peerId === peerId) {
        producer.close();
        this.producers.delete(producerId);
      }
    }

    // Cleanup consumers
    for (const [consumerId, consumer] of this.consumers.entries()) {
      if (consumer.appData.peerId === peerId) {
        consumer.close();
        this.consumers.delete(consumerId);
      }
    }
  }
}