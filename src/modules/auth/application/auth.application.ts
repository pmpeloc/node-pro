import { Auth } from '../domain/auth';
import { AuthRepository } from '../domain/auth.repository';
import { Tokens } from '../domain/tokens.interface';
import { UserPasswordService } from '../../user/domain/services/user-password.service';
import { AuthService } from './auth.service';

export class AuthApplication {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(auth: Auth): Promise<Tokens> {
    const user = await this.authRepository.getUser(auth);
    if (!user) {
      throw new Error('User not found');
    } else {
      const { password, refreshToken } = user;
      const isUserValid = UserPasswordService.compare(
        auth.properties().password,
        password
      );
      if (!isUserValid) {
        throw new Error('Invalid password');
      } else {
        return {
          refreshToken: refreshToken!,
          accessToken: AuthService.generateAccessToken(user),
        };
      }
    }
  }
}
