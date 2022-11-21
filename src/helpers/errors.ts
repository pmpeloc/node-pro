import { NextFunction, Request, Response } from 'express';
import { IError } from '../modules/user/interfaces/helpers/ierror';
import { Trace } from './trace';
import { Logger } from './logger';
import { InfoLogger } from './info-logger';

export default class {
  static notFound(req: Request, res: Response): void {
    res.status(404).send('Not Found');
  }

  static genericError(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const objError: IError = {
      message: error.message,
      status: error.status,
      traceId: Trace.traceId(),
      name: error.name,
      stack: error.stack,
    };
    const info: InfoLogger = {
      traceId: Trace.traceId(),
      typeElement: 'GenericError',
      method: 'genericError',
      message: 'Generic Error',
      request: JSON.stringify(objError),
      datetime: new Date(),
    };
    Logger.getLogger().info(info);
    const objErrorToFrontend = Object.assign({}, objError);
    delete objErrorToFrontend.stack;
    res.status(objErrorToFrontend.status || 500).json(objErrorToFrontend);
  }
}
