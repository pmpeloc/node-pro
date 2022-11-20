import { validate } from 'class-validator';

import { NextFunction, Request, Response } from 'express';
import { DriverListOneValidator } from '../validators/driver.validator';

class DriverMiddleware {
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
}

export const MiddlewareListOne: ((
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>)[] = [DriverMiddleware.ValidateListOne];
