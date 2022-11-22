import { NextFunction, Request, Response } from 'express';
import { IError } from '../modules/user/interfaces/helpers/ierror';
import { AuthService } from '../modules/auth/application/auth.service';

export class Authentication {
  static canActivate(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      const error: IError = new Error('Unauthorized');
      error.status = 401;
      return next(error);
    } else {
      const [bearer, token] = authorization.split(' ');
      if (bearer.toLowerCase() !== 'bearer' || !token) {
        const error: IError = new Error('Unauthorized');
        error.status = 401;
        return next(error);
      }
      AuthService.validateAccessToken(token)
        .then((payload: any) => {
          res.locals.roles = payload.roles;
          return next();
        })
        .catch((err) => {
          const error: IError = new Error(err.message);
          error.status = err.status;
          return next(error);
        });
    }
  }
}
