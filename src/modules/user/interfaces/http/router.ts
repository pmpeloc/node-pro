import { Router } from 'express';

import Controller from './controller';
import { UserRepository } from '../../domain/user.repository';
import UserInfrastructure from '../../infrastructure/user.infrastructure';
import UserApplication from '../../application/user.application';
import { MiddlewareListOne } from './middlewares/user.middleware';

const infrastructure: UserRepository = new UserInfrastructure();
const application = new UserApplication(infrastructure);

const controller = new Controller(application);

class UserRouter {
  expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get('/', controller.list);
    this.expressRouter.get('/:guid', ...MiddlewareListOne, controller.listOne);
    this.expressRouter.post('/', controller.insert);
    this.expressRouter.put('/:guid', controller.update);
    this.expressRouter.delete('/:guid', controller.delete);
  }
}

export default new UserRouter().expressRouter;
