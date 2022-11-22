import { AuthProperties, Auth } from './auth';

export class AuthFactory {
  static create(authProperties: AuthProperties): Auth {
    return new Auth(authProperties);
  }
}
