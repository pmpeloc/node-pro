import { Application } from 'express';
import http from 'http';

export abstract class Bootstrap {
  abstract initialize(): Promise<string>;
}

export class ServerBootstrap extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize() {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(4000)
        .on('listening', () => {
          resolve('Promise resolve successfully');
          console.log('Server is listening in port 4000');
        })
        .on('error', (error) => {
          reject(error);
          console.error(error);
        });
    });
  }
}
