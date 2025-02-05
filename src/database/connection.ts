import mongoose from 'mongoose';
import { logger } from '../utils/logger';

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.set('debug', process.env.NODE_ENV === 'development');
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}