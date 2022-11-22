import { Request, Response } from 'express';

import { AuthApplication } from '../../application/auth.application';
import { AuthFactory } from '../../domain/auth-factory';

export class AuthController {
  constructor(private application: AuthApplication) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = AuthFactory.create({ email, password });
    const authResult = await this.application.login(auth);
    res.json(authResult);
  }
}
