import http, { IncomingMessage, ServerResponse } from 'http';

export abstract class Bootstrap {
  abstract initialize(): Promise<string>;
}

export class ServerBootstrap extends Bootstrap {
  constructor(
    private readonly requestListener: (
      req: IncomingMessage,
      res: ServerResponse
    ) => void
  ) {
    super();
  }

  initialize() {
    return new Promise<any>((resolve, reject) => {
      const server = http.createServer(this.requestListener);
      server
        .listen(4000)
        .on('listening', () => {
          resolve('Promise resolve successfully');
          console.log('Server is listening');
        })
        .on('error', (error) => {
          reject(error);
          console.error(error);
        });
    });
  }
}
