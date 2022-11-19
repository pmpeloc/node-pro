import http from 'http';
import { Application } from 'express';

import { Bootstrap } from './bootstrap';
import { AppService } from './app.service';

export default class ServerBootstrap extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize() {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(+AppService.PORT)
        .on('listening', () => {
          resolve('Promise resolve successfully');
          console.log(`Listening in port: ${+AppService.PORT}`);
        })
        .on('error', (error) => {
          reject(error);
          console.error(error);
        });
    });
  }
}
