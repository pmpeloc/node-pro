import express, { Application } from 'express';
import multer from 'multer';

import userRouter from './modules/user/interfaces/http/router';
import driverRouter from './modules/driver/interfaces/http/router';
import authRouter from './modules/auth/interfaces/http/router';
import HandlerErrors from './helpers/errors';
import HandlerHealth from './helpers/health';
import RedisBootstrap from './bootstrap/redis.bootstrap';
import { Authentication } from './middlewares/authentication.middleware';
import { Authorization } from './middlewares/authorization.middleware';

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.init();
    this.mountHealth();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountInvalidationCache();
    this.mountErrors();
  }

  init() {
    multer({ limits: { fileSize: 8000000 } });
  }

  mountMiddlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
  }

  mountHealth() {
    this.expressApp.use('/health', HandlerHealth);
  }

  mountRoutes(): void {
    this.expressApp.use(
      '/user',
      Authentication.canActivate,
      Authorization.canActive('ADMINISTRATOR', 'SUPER'),
      userRouter
    );
    this.expressApp.use('/driver', driverRouter);
    this.expressApp.use('/auth', authRouter);
  }

  mountInvalidationCache() {
    this.expressApp.get('/invalidation-cache', (req, res) => {
      RedisBootstrap.clear();
      res.send('Cache invalided successfuly');
    });
  }

  mountErrors(): void {
    this.expressApp.use(HandlerErrors.notFound);
    this.expressApp.use(HandlerErrors.genericError);
  }
}

export default new App().expressApp;
