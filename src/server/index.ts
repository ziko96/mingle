import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from '../database/connection';
import { errorHandler } from '../middleware/error';
import { rateLimiter } from '../middleware/rate-limit';
import { logger } from '../utils/logger';
import { SignalingService } from '../services/SignalingService';
import { redis } from '../database/redis';

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(rateLimiter);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN }
});

const signalingService = new SignalingService();

async function bootstrap() {
  const startTime = performance.now();
  
  try {
    await connectDB();
    await redis.connect();
    await signalingService.initialize();
    
    io.on('connection', (socket) => {
      logger.info(`Client connected: ${socket.id}`);
      signalingService.handleConnection(socket);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      const bootTime = Math.round(performance.now() - startTime);
      logger.info(`Server running on port ${PORT} (boot: ${bootTime}ms)`);
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

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection:', reason);
});

bootstrap();