import { validate } from 'class-validator';

import { NextFunction, Request, Response } from 'express';
import { IError } from '../../helpers/ierror';
import {
  DriverInsertValidator,
  DriverListOneValidator,
} from '../validators/driver.validator';

export class DriverMiddleware {
  static async ValidateListOne(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { guid } = req.params;
    const driverListOneValidator = new DriverListOneValidator();
    driverListOneValidator.guid = guid;
    const errors = await validate(driverListOneValidator);
    if (errors.length) {
      return next(new Error('Invalid request'));
    }
    next();
  }

  static async ValidateInsert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, driverLicense, photo } = req.body;
    const driverInsertValidator = new DriverInsertValidator();
    Object.assign(driverInsertValidator, {
      name,
      lastname,
      email,
      driverLicense,
      photo,
    });
    const errors = await validate(driverInsertValidator);
    if (errors.length) {
      const listErrors = errors
        .map((err: any) => err.constraints)
        .map((e: any) => {
          let messages = '';
          Object.keys(e).forEach((prop: string) => {
            messages += `${e[prop]}\n`;
          });
          return messages;
        });
      const error: IError = new Error('Invalid parameters');
      error.status = 422;
      error.stack = JSON.stringify(listErrors);
      return next(error);
    }
    next();
  }
}

export const MiddlewareListOne: ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>)[] = [DriverMiddleware.ValidateListOne];
