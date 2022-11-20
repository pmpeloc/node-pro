import { DriverProperties } from '../../../../domain/driver';
import { DTO } from './dto.interface';

interface DriverDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string | undefined;
  photo: string | undefined;
  driverLicense: string | undefined;
}

export type DriverDeleteOneDTO = DriverDTO;

export class DriverDeleteMapping extends DTO<
  DriverProperties,
  DriverDeleteOneDTO
> {
  execute(data: DriverProperties): DriverDeleteOneDTO {
    return {
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email?.value,
      guid: data?.guid,
      photo: data?.photo,
      driverLicense: data?.driverLicense,
    };
  }
}
