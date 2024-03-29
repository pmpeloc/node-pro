import { UserProperties } from '../../../../domain/user';
import { DTO } from './dto.interface';

interface UserDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string | undefined;
}

export type UserDeleteOneDTO = UserDTO;

export class UserDeleteMapping extends DTO<UserProperties, UserDeleteOneDTO> {
  execute(data: UserProperties): UserDeleteOneDTO {
    return {
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email?.value,
      guid: data?.guid,
    };
  }
}
