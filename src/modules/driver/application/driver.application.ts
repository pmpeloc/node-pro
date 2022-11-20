import { DriverRepository } from '../domain/driver.repository';
import Driver, { DriverUpdate } from '../domain/driver';

export default class DriverApplication {
  constructor(private readonly driverRepository: DriverRepository) {}

  list() {
    return this.driverRepository.list();
  }

  listOne(guid: string) {
    return this.driverRepository.listOne(guid);
  }

  insert(driver: Driver) {
    return this.driverRepository.insert(driver);
  }

  async update(guid: string, driver: Partial<DriverUpdate>) {
    return this.driverRepository.update(guid, driver);
  }

  async delete(guid: string) {
    return this.driverRepository.delete(guid);
  }
}
