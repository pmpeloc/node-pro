import { Auth } from './auth';

export type UserType = {
  name: string;
  lastname: string;
  password: string;
  email: string;
  refreshToken: string;
  guid: string;
};

export interface AuthRepository {
  getUser(auth: Auth): Promise<UserType | null>;
  getUserByRefreshToken(refreshToken: string): Promise<UserType | null>;
}
