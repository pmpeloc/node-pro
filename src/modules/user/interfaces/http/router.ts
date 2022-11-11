import { Router, Request, Response } from 'express';

import Controller from './controller';
import { UserRepository } from '../../domain/user.repository';
import UserInfrastructure from '../../infrastructure/user.infrastructure';
import UserApplication from '../../application/user.application';

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
    this.expressRouter.get('/', (req: Request, res: Response) => {
      controller.list(req, res);
    });
  }
}

export default new UserRouter().expressRouter;
