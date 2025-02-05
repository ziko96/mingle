import mongoose from 'mongoose';

export const databaseConfig = {
  uri: process.env.MONGODB_URI,
  options: {
    replicaSet: 'rs0',
    readPreference: 'secondaryPreferred',
    retryWrites: true,
    w: 'majority',
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 50
  }
};

export const initializeDatabase = async () => {
  await mongoose.connect(databaseConfig.uri, databaseConfig.options);
};