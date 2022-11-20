import { DTO } from './dto.interface';
import { DriverProperties } from '../../../../domain/driver';

interface DriverDTO {
  name: string;
  lastname: string;
  guid: string | undefined;
  email: string;
  photo: string | undefined;
  driverLicense: string | undefined;
}

export type DriverListDTO = DriverDTO[];

export class DriverListMapping extends DTO<DriverProperties[], DriverListDTO> {
  execute(data: DriverProperties[]): DriverListDTO {
    return data.map((driver: DriverProperties) => {
      return {
        name: driver.name,
        lastname: driver.lastname,
        guid: driver.guid,
        email: driver.email.value,
        photo: driver.photo,
        driverLicense: driver.driverLicense,
      };
    });
  }
}
