import { DriverProperties } from '../../../../domain/driver';
import { DTO } from './dto.interface';

interface DriverOneDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string | undefined;
  photo: string | undefined;
  driverLicense: string | undefined;
}

export type DriverListOneDTO = DriverOneDTO;

export class DriverListOneMapping extends DTO<
  DriverProperties,
  DriverListOneDTO
> {
  execute(data: DriverProperties): DriverListOneDTO {
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
