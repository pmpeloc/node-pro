import { UserProperties } from '../../../../domain/user';
import { DTO } from './dto.interface';

interface UserDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string | undefined;
}

export type UserUpdateOneDTO = UserDTO;

export class UserUpdateMapping extends DTO<UserProperties, UserUpdateOneDTO> {
  execute(data: UserProperties): UserUpdateOneDTO {
    return {
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email?.value,
      guid: data?.guid,
    };
  }
}
