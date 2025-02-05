import { Server } from 'node-turn';

export const initializeTurnServer = () => {
  const server = new Server({
    authMech: 'long-term',
    credentials: {
      [process.env.TURN_SERVER_USERNAME]: process.env.TURN_SERVER_CREDENTIAL
    },
    realm: 'mingle.com',
    listeningPort: 3478
  });

  server.start();
};