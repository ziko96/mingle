import { Socket } from 'socket.io';
import { WebRTCService } from '../../services/WebRTCService';
import { ChatService } from '../../services/ChatService';
import { MonitoringService } from '../../services/monitoring';

export class WebSocketHandler {
  constructor(
    private webRTCService: WebRTCService,
    private chatService: ChatService,
    private monitoring: MonitoringService
  ) {}

  handleConnection(socket: Socket) {
    this.monitoring.recordConnection();

    socket.on('join-room', (roomId: string) => {
      this.chatService.joinRoom(socket, roomId);
    });

    socket.on('message', (message: string) => {
      this.chatService.handleMessage(socket, message);
      this.monitoring.recordMessage();
    });

    socket.on('webrtc-signal', (signal: any) => {
      this.webRTCService.handleSignal(socket, signal);
    });

    socket.on('disconnect', () => {
      this.monitoring.recordDisconnection();
    });
  }
}