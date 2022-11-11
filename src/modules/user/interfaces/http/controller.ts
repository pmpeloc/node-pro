import { Request, Response } from 'express';

export default class {
  description(req: Request, res: Response) {
    res.send('User description');
  }

  list(req: Request, res: Response) {
    res.send('User list');
  }

  detail(req: Request, res: Response) {
    res.send('User detail');
  }

  delete(req: Request, res: Response) {
    res.send('User delete');
  }
}
