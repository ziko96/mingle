interface Config {
  port: number;
  mongoUri: string;
  redisUrl: string;
  jwtSecret: string;
  corsOrigin: string;
  mediasoupSettings: {
    rtcMinPort: number;
    rtcMaxPort: number;
    listenIp: string;
  };
}