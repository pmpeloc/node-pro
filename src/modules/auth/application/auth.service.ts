import jwt from 'jwt-simple';
import moment from 'moment';
import yenv from 'yenv';
import { v4 as uuidv4 } from 'uuid';
import { UserType } from '../domain/auth.repository';

const env = yenv('.env');

interface IPayload {
  name: string;
  lastname: string;
  iat: number;
  exp: number;
}

interface IErrorPayload {
  status: number;
  message: string;
}

export type ResponseValidateToken = IPayload | IErrorPayload;

export enum TOKEN_ERROR {
  TOKEN_EXPIRED = 'Token expired',
  TOKEN_INVALID = 'Token invalid',
}

export enum TOKEN_ERROR_MESSAGE {
  TOKEN_EXPIRED = 'El token ha expirado',
  TOKEN_INVALID = 'El token es inválido',
}

export class AuthService {
  static generateAccessToken(user: UserType): string {
    const { name, lastname } = user;
    const payload: IPayload = {
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

  static async validateAccessToken(
    accessToken: string
  ): Promise<ResponseValidateToken> {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(accessToken, env.KEYWORD_SECRET);
        resolve(payload);
      } catch (error: any) {
        if (
          error.message.toLowerCase() ===
          TOKEN_ERROR.TOKEN_EXPIRED.toLowerCase()
        ) {
          reject({
            status: 409,
            message: TOKEN_ERROR_MESSAGE.TOKEN_EXPIRED,
          });
        } else {
          reject({
            status: 401,
            message: TOKEN_ERROR_MESSAGE.TOKEN_INVALID,
          });
        }
      }
    });
  }
}
