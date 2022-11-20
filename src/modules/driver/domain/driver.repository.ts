import { Result } from 'neverthrow';
import { DriverDatabaseException } from '../infrastructure/exceptions/driver.exception';

import Driver, { DriverUpdate } from './driver';
import { DriverNotFoundException } from './exceptions/driver.exception';

export interface DriverRepository {
  list(): Promise<Driver[]>;
  listOne(guid: string): Promise<Result<Driver, DriverNotFoundException>>;
  insert(driver: Driver): Promise<Result<Driver, DriverDatabaseException>>;
  update(
    guid: string,
    driver: Partial<DriverUpdate>
  ): Promise<Result<Driver, DriverNotFoundException>>;
  delete(guid: string): Promise<Result<Driver, DriverNotFoundException>>;
}
