import { v4 as uuidv4 } from 'uuid';
import { err, ok, Result } from 'neverthrow';

import User, { UserProperties } from './user';
import { EmailVO } from './value-objects/email.vo';
import { UserPasswordService } from './services/user-password.service';
import {
  UserLastnameRequiredException,
  UserNameRequiredException,
  UserPasswordLengthInvalidException,
  UserPasswordRequiredException,
} from './exceptions/user.exception';

export type UserResult = Result<
  User,
  | UserNameRequiredException
  | UserLastnameRequiredException
  | UserPasswordRequiredException
  | UserPasswordLengthInvalidException
>;

export default class UserFactory {
  async create(
    name: string,
    lastname: string,
    email: EmailVO,
    password: string,
    roles: number[] | string[]
  ): Promise<UserResult> {
    if (!name || name.trim() === '') {
      return err(new UserNameRequiredException());
    }
    if (!lastname || lastname.trim() === '') {
      return err(new UserLastnameRequiredException());
    }
    if (!password || password.trim() === '') {
      return err(new UserPasswordRequiredException());
    }
    if (password.length < 4) {
      return err(new UserPasswordLengthInvalidException(password));
    }

    const passwordHash = await UserPasswordService.hash(password);
    const userProperties: UserProperties = {
      name,
      lastname,
      email,
      password: passwordHash,
      guid: uuidv4(),
      refreshToken: uuidv4(),
      roles,
    };
    const user = new User(userProperties);
    return ok(user);
  }
}
