import { Router } from 'express';

class UserRouter {
  expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get('/description', (req, res) => {});
    this.expressRouter.get('/list', (req, res) => {});
    this.expressRouter.get('/detail', (req, res) => {});
    this.expressRouter.get('/delete', (req, res) => {});
  }
}

export default new UserRouter().expressRouter;
