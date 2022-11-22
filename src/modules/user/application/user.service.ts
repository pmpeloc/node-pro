import bcrypt from 'bcryptjs';

export class UserService {
  static hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
