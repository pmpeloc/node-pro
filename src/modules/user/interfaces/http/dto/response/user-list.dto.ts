import { DTO } from './dto.interface';
import User from '../../../../domain/user';
import { UserProperties } from '../../../../domain/user';

interface UserDTO {
  name: string;
  lastname: string;
  guid: string | undefined;
  email: string;
}

export type UserListDTO = UserDTO[];

export class UserListMapping extends DTO<UserProperties[], UserListDTO> {
  execute(data: UserProperties[]): UserListDTO {
    return data.map((user: UserProperties) => {
      return {
        name: user.name,
        lastname: user.lastname,
        guid: user.guid,
        email: user.email.value,
      };
    });
  }
}
