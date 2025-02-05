import { io, Socket } from 'socket.io-client';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { app } from '../../src/server/server';

describe('Chat E2E', () => {
  let clientSocket: Socket;
  let httpServer: any;
  let serverSocket: Server;

  beforeAll((done) => {
    httpServer = createServer(app);
    serverSocket = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = io(`http://localhost:${port}`);
      done();
    });
  });

  afterAll(() => {
    clientSocket.close();
    serverSocket.close();
    httpServer.close();
  });

  test('should connect and exchange messages', (done) => {
    clientSocket.emit('message', 'test message');
    clientSocket.on('message', (msg) => {
      expect(msg.content).toBe('test message');
      done();
    });
  });
});