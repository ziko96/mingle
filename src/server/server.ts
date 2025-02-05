import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SignalingService } from '../services/SignalingService';
import { errorHandler } from '../middleware/error';
import { rateLimiter } from '../middleware/rate-limit';
import { logger } from '../utils/logger';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN }
});

const signalingService = new SignalingService();

app.use(express.json());
app.use(rateLimiter);
app.use(errorHandler);

async function bootstrap() {
  try {
    await signalingService.initialize();
    
    io.on('connection', (socket) => {
      signalingService.handleConnection(socket);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Bootstrap failed:', error);
    process.exit(1);
  }
}

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});

bootstrap();

export { app, httpServer };