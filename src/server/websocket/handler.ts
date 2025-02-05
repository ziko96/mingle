import { Server, Socket } from 'socket.io';

const handleConnection = (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });

    socket.on('message', (message: string) => {
        console.log('Message received:', message);
        // Handle message logic here
        socket.broadcast.emit('message', message);
    });
};

export const setupWebSocket = (server: any) => {
    const io = new Server(server);

    io.on('connection', handleConnection);
};