import { Request, Response } from 'express';

import UserApplication from '../../application/user.application';
import User, { UserInsert } from '../../domain/user';
import UserFactory from '../../domain/user-factory';

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  list(req: Request, res: Response) {
    const list = this.application.list();
    res.json(list);
  }

  listOne(req: Request, res: Response) {
    const { guid } = req.params;
    const result = this.application.listOne(guid);
    res.json(result);
  }

  insert(req: Request, res: Response) {
    const { name, lastname, email, password }: UserInsert = req.body;
    const user: User = new UserFactory().create(
      name,
      lastname,
      email,
      password
    );
    const result = this.application.insert(user);
    res.json(result);
  }
  update(req: Request, res: Response) {
    const { guid } = req.params;
    const { name, lastname, email, password } = req.body;
    const user = this.application.listOne(guid);
    if (user) {
      user.update({ name, lastname, email, password });
      const result = this.application.update(user);
      res.json(result);
    }
  }

  delete(req: Request, res: Response) {
    const { guid } = req.params;
    const user = this.application.listOne(guid);
    user?.delete();
    const result = this.application.update(user!);
    res.json(result);
  }
}
