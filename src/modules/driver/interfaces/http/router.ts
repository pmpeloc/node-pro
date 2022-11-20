import { Router } from 'express';

import Controller from './controller';
import { DriverRepository } from '../../domain/driver.repository';
import DriverInfrastructure from '../../infrastructure/driver.infrastructure';
import DriverApplication from '../../application/driver.application';
import { MiddlewareListOne } from './middlewares/driver.middleware';
import { UploadBuilder } from '../../../../core/infrastructure/upload.builder';
import {
  FactoryAWS,
  IUploadImage,
} from '../../../../core/infrastructure/upload.middleware';

const infrastructure: DriverRepository = new DriverInfrastructure();
const application = new DriverApplication(infrastructure);
const controller = new Controller(application);
const uploadMiddleware: IUploadImage = new FactoryAWS();

class DriverRouter {
  expressRouter: Router;

  constructor() {
    this.expressRouter = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.expressRouter.get('/', controller.list);
    this.expressRouter.get('/:guid', ...MiddlewareListOne, controller.listOne);
    this.expressRouter.post(
      '/',
      uploadMiddleware.save(
        new UploadBuilder()
          .addFieldName('photo')
          .addMaxSize(8000000)
          .addAllowedMimeTypes(['image/jpeg', 'image/png'])
          .addDestination('uploads')
          .addIsPublic(true)
          .build()
      ),
      controller.insert
    );
    this.expressRouter.put('/:guid', controller.update);
    this.expressRouter.delete('/:guid', controller.delete);
  }
}

export default new DriverRouter().expressRouter;
