import pino from 'pino';
import * as prometheus from 'prom-client';

export class MonitoringService {
  private logger = pino();
  private metrics = {
    activeConnections: new prometheus.Gauge({
      name: 'websocket_active_connections',
      help: 'Number of active WebSocket connections'
    }),
    messagesSent: new prometheus.Counter({
      name: 'messages_sent_total',
      help: 'Total number of messages sent'
    })
  };

  recordConnection() {
    this.metrics.activeConnections.inc();
  }

  recordDisconnection() {
    this.metrics.activeConnections.dec();
  }

  recordMessage() {
    this.metrics.messagesSent.inc();
  }

  getMetrics() {
    return prometheus.register.metrics();
  }
}