import express, { Application } from 'express';

import routerUser from './modules/user/interfaces/http/router';
import HandlerErrors from './helpers/errors';
import HandlerHealth from './helpers/health';

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.mountHealth();
    this.mountRoutes();
    this.mountErrors();
  }

  mountHealth() {
    this.expressApp.use('/health', HandlerHealth);
  }

  mountRoutes(): void {
    this.expressApp.use('/user', routerUser);
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
  }
}

export default new App().expressApp;
