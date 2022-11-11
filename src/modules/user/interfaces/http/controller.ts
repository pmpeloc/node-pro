import { Request, Response } from 'express';

import UserApplication from '../../application/user.application';
import User, { UserProperties } from '../../domain/user';

export default class {
  constructor(private application: UserApplication) {}

  list(req: Request, res: Response) {
    const list = this.application.list();
    res.json(list);
  }

  listOne(req: Request, res: Response) {
    return this.application.listOne(1);
  }

  insert(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 10,
      name: 'Alfred',
      lastname: 'Travolta',
      email: 'alfred@mail.com',
      password: '1234',
      refreshToken: 'ABC123',
    };
    const user: User = new User(properties);
    return this.application.insert(user);
  }

  update(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 1,
      name: 'Alfred',
      lastname: 'Travolta',
      email: 'alfred@mail.com',
      password: '1234',
      refreshToken: 'ABC123',
    };
    const user: User = new User(properties);
    return this.application.update(user);
  }

  delete(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 1,
      name: 'Alfred',
      lastname: 'Travolta',
      email: 'alfred@mail.com',
      password: '1234',
      refreshToken: 'ABC123',
    };
    const user: User = new User(properties);
    return this.application.delete(user);
  }
}
