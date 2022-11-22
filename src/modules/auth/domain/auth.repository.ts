import { Auth } from './auth';
import { Role } from '../../role/domain/role';

export type UserType = {
  name: string;
  lastname: string;
  password: string;
  email: string;
  refreshToken: string;
  guid: string;
  roles: string[] | number[] | Role[];
};

export interface AuthRepository {
  getUser(auth: Auth): Promise<UserType | null>;
  getUserByRefreshToken(refreshToken: string): Promise<UserType | null>;
}
