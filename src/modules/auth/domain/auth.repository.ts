import { Auth } from './auth';

export type UserType = {
  name: string;
  lastname: string;
  password: string;
  email: string;
  refreshToken: string;
};

export interface AuthRepository {
  getUser(auth: Auth): Promise<UserType | null>;
}
