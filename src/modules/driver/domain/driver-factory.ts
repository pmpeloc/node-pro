import { v4 as uuidv4 } from 'uuid';
import { err, ok, Result } from 'neverthrow';

import Driver, { DriverProperties } from './driver';
import { EmailVO } from './value-objects/email.vo';
import {
  DriverLastnameRequiredException,
  DriverNameRequiredException,
} from './exceptions/driver.exception';

export type DriverResult = Result<
  Driver,
  DriverNameRequiredException | DriverLastnameRequiredException
>;

export default class UserFactory {
  async create(
    name: string,
    lastname: string,
    email: EmailVO
  ): Promise<DriverResult> {
    if (!name || name.trim() === '') {
      return err(new DriverNameRequiredException());
    }
    if (!lastname || lastname.trim() === '') {
      return err(new DriverLastnameRequiredException());
    }
    const driverProperties: DriverProperties = {
      name,
      lastname,
      email,
      guid: uuidv4(),
    };
    const driver = new Driver(driverProperties);
    return ok(driver);
  }
}
