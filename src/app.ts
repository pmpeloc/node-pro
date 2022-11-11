import express, { Application, Request, Response } from 'express';

import { exceptionNotFound, getRoute, IRoute } from './routes';

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mounthRoutes();
  }

  mounthRoutes(): void {
    this.expressApp.get('/user/description', (req: Request, res: Response) => {
      res.status(200).send('User description');
    });
  }
}

export default new App().expressApp;
