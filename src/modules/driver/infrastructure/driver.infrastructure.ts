import { err, ok, Result } from 'neverthrow';

import Driver from '../domain/driver';
import { DriverRepository } from '../domain/driver.repository';
import { EmailResult, EmailVO } from '../domain/value-objects/email.vo';
import { DriverEntity } from './driver.entity';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import {
  DriverNotFoundException,
  DriverEmailInvalidException,
} from '../domain/exceptions/driver.exception';
import { DriverUpdate } from '../domain/driver';
import { DriverDatabaseException } from './exceptions/driver.exception';
import { Trace } from '../../../helpers/trace';
import { Logger } from '../../../helpers/logger';
import { InfoLogger } from '../../../helpers/info-logger';

export default class DriverInfrastructure implements DriverRepository {
  async list(): Promise<Driver[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(DriverEntity);
    const result = await repo.find({ where: { active: true } });
    return result.map((el: DriverEntity) => {
      const emailResult: EmailResult = EmailVO.create(el.email);
      if (emailResult.isErr()) {
        throw new DriverEmailInvalidException();
      }
      return new Driver({
        guid: el.guid,
        name: el.name,
        lastname: el.lastname,
        email: emailResult.value,
        photo: el.photo,
        driverLicense: el.driverLicense,
        active: el.active,
      });
    });
  }

  async listOne(
    guid: string
  ): Promise<Result<Driver, DriverNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(DriverEntity);
    const driverEntity = await repo.findOne({ where: { guid } });
    if (!driverEntity) {
      return err(new DriverNotFoundException());
    } else {
      const emailResult: EmailResult = EmailVO.create(driverEntity.email);
      if (emailResult.isErr()) {
        return err(new DriverEmailInvalidException());
      }
      const info: InfoLogger = {
        traceId: Trace.traceId(),
        typeElement: 'DriverInfrastructure',
        method: 'ListOne',
        message: 'Listing one driver',
        request: JSON.stringify({ guid }),
        datetime: new Date(),
      };
      Logger.getLogger().info(info);
      return ok(
        new Driver({
          guid: driverEntity!.guid,
          name: driverEntity!.name,
          lastname: driverEntity!.lastname,
          email: emailResult.value,
          photo: driverEntity.photo,
          driverLicense: driverEntity.driverLicense,
          active: driverEntity!.active,
        })
      );
    }
  }

  async insert(
    driver: Driver
  ): Promise<Result<Driver, DriverDatabaseException>> {
    const driverInsert = new DriverEntity();
    const { guid, name, lastname, email, active, photo, driverLicense } =
      driver.properties();
    Object.assign(driverInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      photo,
      driverLicense,
      active,
    });
    try {
      await DatabaseBootstrap.dataSource
        .getRepository(DriverEntity)
        .save(driverInsert);
      return ok(driver);
    } catch (error: any) {
      return err(new DriverDatabaseException(error.sqlMessage));
    }
  }

  async update(
    guid: string,
    driver: Partial<DriverUpdate>
  ): Promise<Result<Driver, DriverNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(DriverEntity);
    const driverFound = await repo.findOne({ where: { guid, active: true } });
    if (driverFound) {
      Object.assign(driverFound, driver);
      const driverEntity = await repo.save(driverFound);
      const emailResult: EmailResult = EmailVO.create(driverEntity.email);
      if (emailResult.isErr()) {
        return err(new DriverEmailInvalidException());
      }
      return ok(
        new Driver({
          guid: driverEntity!.guid,
          name: driverEntity!.name,
          lastname: driverEntity!.lastname,
          email: emailResult.value,
          photo: driverEntity.photo,
          driverLicense: driverEntity.driverLicense,
          active: driverEntity!.active,
        })
      );
    } else {
      return err(new DriverNotFoundException());
    }
  }

  async delete(guid: string): Promise<Result<Driver, DriverNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(DriverEntity);
    const driverFound = await repo.findOne({ where: { guid, active: true } });
    if (driverFound) {
      driverFound.active = false;
      const driverEntity = await repo.save(driverFound);
      const emailResult: EmailResult = EmailVO.create(driverEntity.email);
      if (emailResult.isErr()) {
        return err(new DriverEmailInvalidException());
      }
      return ok(
        new Driver({
          guid: driverEntity!.guid,
          name: driverEntity!.name,
          lastname: driverEntity!.lastname,
          email: emailResult.value,
          photo: driverEntity.photo,
          driverLicense: driverEntity.driverLicense,
          active: driverEntity!.active,
        })
      );
    } else {
      return err(new DriverNotFoundException());
    }
  }
}
