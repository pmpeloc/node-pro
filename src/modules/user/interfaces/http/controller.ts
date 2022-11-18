import { Request, Response } from 'express';

import UserApplication from '../../application/user.application';
import User from '../../domain/user';
import UserFactory from '../../domain/user-factory';
import { UserListDTO, UserListMapping } from './dto/response/user-list.dto';
import { UserListOneMapping } from './dto/response/user-list-one.dto';
import { EmailVO } from '../../domain/value-objects/email.vo';
import { UserInsertMapping } from './dto/response/user-insert.dto';

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    const list = await this.application.list();
    const result: UserListDTO = new UserListMapping().execute(
      list.map((user) => user.properties())
    );
    res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { guid } = req.params;
    const user = await this.application.listOne(guid);
    const result = new UserListOneMapping().execute(user!.properties());
    res.json(result);
  }

  async insert(req: Request, res: Response) {
    const { name, lastname, email, password } = req.body;
    const user: User = await new UserFactory().create(
      name,
      lastname,
      EmailVO.create(email),
      password
    );
    const data = await this.application.insert(user);
    const result = new UserInsertMapping().execute(data.properties());
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const { guid } = req.params;
    const fieldsToUpdate = req.body;
    const userToUpdate = new User({ guid, ...fieldsToUpdate });
    const data = await this.application.update(userToUpdate);
    res.json(data);
  }

  delete(req: Request, res: Response) {
    // const { guid } = req.params;
    // const user = this.application.listOne(guid);
    // user?.delete();
    // const result = this.application.update(user!);
    // res.json(result);
  }
}
