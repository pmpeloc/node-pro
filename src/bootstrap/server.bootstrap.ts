import http from 'http';
import { Application } from 'express';

import { Bootstrap } from './bootstrap';

export default class ServerBootstrap extends Bootstrap {
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
        })
        .on('error', (error) => {
          reject(error);
          console.error(error);
        });
    });
  }
}
