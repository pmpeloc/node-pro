import { NextFunction, Request, Response } from 'express';

import DriverApplication from '../../application/driver.application';
import DriverFactory, { DriverResult } from '../../domain/driver-factory';
import { EmailResult, EmailVO } from '../../domain/value-objects/email.vo';
import {
  DriverListDTO,
  DriverListMapping,
} from './dto/response/driver-list.dto';
import { DriverListOneMapping } from './dto/response/driver-list-one.dto';
import { DriverInsertMapping } from './dto/response/driver-insert.dto';
import { DriverUpdateMapping } from './dto/response/driver-update.dto';
import { DriverDeleteMapping } from './dto/response/driver-delete.dto';
import { GuidVO } from '../../domain/value-objects/guid.vo';
import { IError } from '../helpers/ierror';
import RedisBootstrap from '../../../../bootstrap/redis.bootstrap';
import { Trace } from '../../../../helpers/trace';
import { InfoLogger } from '../../../../helpers/info-logger';
import { Logger } from '../../../../helpers/logger';

export default class {
  constructor(private application: DriverApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    const list = await this.application.list();
    const result: DriverListDTO = new DriverListMapping().execute(
      list.map((driver) => driver.properties())
    );
    RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(result));
    res.json(result);
  }

  async listOne(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;
    const info: InfoLogger = {
      traceId: Trace.traceId(true),
      typeElement: 'DriverController',
      method: 'listOne',
      message: 'Listing one driver',
      request: JSON.stringify({ guid }),
      datetime: new Date(),
    };
    Logger.getLogger().info(JSON.stringify(info));
    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }
    const driverResult = await this.application.listOne(guid);
    if (driverResult.isErr()) {
      const err: IError = new Error(driverResult.error.message);
      err.status = 404;
      return next(err);
    } else if (driverResult.isOk()) {
      const result = new DriverListOneMapping().execute(
        driverResult.value.properties()
      );
      const responseResult = {
        traceId: Trace.traceId(),
        result,
      };
      RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(responseResult));
      return res.json(responseResult);
    }
  }

  async insert(req: Request, res: Response, next: NextFunction) {
    const { name, lastname, email, photo, driverLicense } = req.body;
    const emailResult: EmailResult = EmailVO.create(email);
    if (emailResult.isErr()) {
      const err: IError = new Error(emailResult.error.message);
      err.status = 411;
      return next(err);
    }
    const driverResult: DriverResult = await new DriverFactory().create(
      name,
      lastname,
      emailResult.value,
      photo,
      driverLicense
    );
    if (driverResult.isErr()) {
      const err: IError = new Error(driverResult.error.message);
      err.status = 411;
      return next(err);
    } else {
      const dataResult = await this.application.insert(driverResult.value);
      if (dataResult.isErr()) {
        const err: IError = new Error(dataResult.error.message);
        err.status = 411;
        return next(err);
      }
      const result = new DriverInsertMapping().execute(
        dataResult.value.properties()
      );
      RedisBootstrap.clear('DRIVERS');
      res.json(result);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;
    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }
    const fieldsToUpdate = req.body;
    const dataResult = await this.application.update(guid, fieldsToUpdate);
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message);
      err.status = 404;
      return next(err);
    } else {
      const result = new DriverUpdateMapping().execute(
        dataResult.value.properties()
      );
      res.json(result);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { guid } = req.params;
    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      const err: IError = new Error(guidResult.error.message);
      err.status = 411;
      return next(err);
    }
    const dataResult = await this.application.delete(guid);
    if (dataResult.isErr()) {
      const err: IError = new Error(dataResult.error.message);
      err.status = 404;
      return next(err);
    } else {
      const result = new DriverDeleteMapping().execute(
        dataResult.value.properties()
      );
      res.json(result);
    }
  }
}
