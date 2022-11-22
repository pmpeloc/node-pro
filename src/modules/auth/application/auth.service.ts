import jwt from 'jwt-simple';
import moment from 'moment';
import yenv from 'yenv';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../domain/auth.repository';

const env = yenv('.env');

export class AuthService {
  static generateAccessToken(user: UserType): string {
    const { name, lastname } = user;
    const payload = {
      name,
      lastname,
      iat: moment().unix(),
      exp: moment().add(10, 'minutes').unix(),
    };
    return jwt.encode(payload, env.KEYWORD_SECRET || 'secret');
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }
}
