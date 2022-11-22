import { UserProperties } from '../../../../domain/user';
import { DTO } from './dto.interface';
import { Role } from '../../../../../role/domain/role';

interface UserOneDTO {
  name: string;
  lastname: string;
  email: string;
  guid: string | undefined;
  roles: number[] | string[] | Role[];
}

export type UserListOneDTO = UserOneDTO;

export class UserListOneMapping extends DTO<UserProperties, UserListOneDTO> {
  execute(data: UserProperties): UserListOneDTO {
    return {
      name: data?.name,
      lastname: data?.lastname,
      email: data?.email?.value,
      guid: data?.guid,
      roles: data?.roles,
    };
  }
}
