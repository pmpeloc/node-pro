import { Router } from 'express';
import { AuthRepository } from '../../domain/auth.repository';
import { AuthInfrastructure } from '../../infrastructure/auth.infrastructure';
import { AuthApplication } from '../../application/auth.application';
import { AuthController } from './controller';
import { UserRepository } from '../../../user/domain/user.repository';
import UserInfrastructure from '../../../user/infrastructure/user.infrastructure';
import UserApplication from '../../../user/application/user.application';

const infrastructureUser: UserRepository = new UserInfrastructure();
const applicationUser = new UserApplication(infrastructureUser);
const infrastructureAuth: AuthRepository = new AuthInfrastructure();
const applicationAuth = new AuthApplication(
  infrastructureAuth,
  applicationUser
);
const controller = new AuthController(applicationAuth);

class AuthRouter {
  readonly expressRouter;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.post('/login', controller.login);
    this.expressRouter.post('/refresh', controller.getNewAccessToken);
  }
}

export default new AuthRouter().expressRouter;
