import { Router } from 'express';
import { AuthRepository } from '../../domain/auth.repository';
import { AuthInfrastructure } from '../../infrastructure/auth.infrastructure';
import { AuthApplication } from '../../application/auth.application';
import { AuthController } from './controller';

const infrastructure: AuthRepository = new AuthInfrastructure();
const application = new AuthApplication(infrastructure);
const controller = new AuthController(application);

class AuthRouter {
  readonly expressRouter;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.post('/login', controller.login);
  }
}

export default new AuthRouter().expressRouter;
