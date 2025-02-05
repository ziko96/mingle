import mongoose from 'mongoose';

export const createIndexes = async () => {
  await mongoose.connection.collection('users').createIndexes([
    { key: { email: 1 }, unique: true },
    { key: { lastActive: 1 } }
  ]);

  await mongoose.connection.collection('chats').createIndexes([
    { key: { participants: 1 } },
    { key: { createdAt: 1 } }
  ]);
};