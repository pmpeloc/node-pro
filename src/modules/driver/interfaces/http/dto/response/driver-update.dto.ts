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

export type DriverUpdateOneDTO = DriverDTO;

export class DriverUpdateMapping extends DTO<
  DriverProperties,
  DriverUpdateOneDTO
> {
  execute(data: DriverProperties): DriverUpdateOneDTO {
    return {
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email?.value,
      guid: data?.guid,
      photo: data.photo,
      driverLicense: data.driverLicense,
    };
  }
}
