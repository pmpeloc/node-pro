import { Router } from 'express';

class RouterHealth {
  readonly expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get('/', (req, res) => {
      res.send('All is ok');
    });
  }
}

export default new RouterHealth().expressRouter;
