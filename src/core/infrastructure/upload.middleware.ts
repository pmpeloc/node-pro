import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import multer_s3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import { UploadOptions } from './upload.builder';
import { AppService } from '../../bootstrap/app.service';
import { IError } from '../../modules/driver/interfaces/helpers/ierror';

export interface IUploadImage {
  save(
    options: UploadOptions
  ): (req: Request, res: Response, next: NextFunction) => void;
}

export class FactoryAWS implements IUploadImage {
  save(options: UploadOptions) {
    return multer({
      limits: { fieldSize: options.maxSize },
      storage: multer_s3({
        s3: new S3Client({}),
        bucket: AppService.S3_BUCKET_NAME_PHOTOS,
        acl: options.isPublic ? 'public-read' : '',
        // metadata: (req, file, cb) => {}
        metadata(req, file, cb) {
          cb(null, { fieldName: file.filename });
        },
        key(req: Request, file, cb) {
          const mimetype = file.mimetype;
          const isFileAllowed = options.allowedMimeTypes.includes(mimetype);
          if (!isFileAllowed) {
            const error: IError = new Error('File type not allowed');
            error.status = 422;
            return cb(error);
          }
          const partsFileName = file.originalname.split('.');
          const extension = partsFileName[partsFileName.length - 1];
          const fileName = `${options.destination}/${Date.now()}.${extension}`;
          req.body[options.fieldName] = fileName;
          cb(null, fileName);
        },
      }),
    }).single(options.fieldName);
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
