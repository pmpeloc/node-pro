import { NextFunction, Request, Response } from 'express';
import { UploadOptions } from './upload.builder';

export interface IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export class FactoryAWS implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.info('Factory AWS');
      console.log(options);
      next();
    };
  }
}

export class FactoryGoogle implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.info('Factory Google');
      console.log(options);
      next();
    };
  }
}

export class FactoryAzure implements IUploadImage {
  save(options: UploadOptions) {
    return (req: Request, res: Response, next: NextFunction) => {
      console.info('Factory Azure');
      console.log(options);
      next();
    };
  }
}
