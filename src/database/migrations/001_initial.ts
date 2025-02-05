import mongoose from 'mongoose';

export async function up() {
  await mongoose.connection.createCollection('users');
  await mongoose.connection.createCollection('chats');
  
  await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
  await mongoose.connection.collection('chats').createIndex({ participants: 1 });
}

export async function down() {
  await mongoose.connection.dropCollection('users');
  await mongoose.connection.dropCollection('chats');
}