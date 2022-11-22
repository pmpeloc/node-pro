import { Auth } from '../domain/auth';
import { AuthRepository, UserType } from '../domain/auth.repository';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { UserEntity } from '../../user/infrastructure/user.entity';

export class AuthInfrastructure implements AuthRepository {
  async getUser(auth: Auth): Promise<UserType | null> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { email: auth.properties().email },
    });
    if (!result) {
      return null;
    }
    const { name, lastname, email, password } = result;
    return {
      name,
      lastname,
      email,
      password,
      refreshToken: result.refreshToken,
      guid: result.guid,
    };
  }

  async getUserByRefreshToken(refreshToken: string): Promise<UserType | null> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { refreshToken },
    });
    if (!result) {
      return null;
    }
    const { name, lastname, email, password } = result;
    return {
      name,
      lastname,
      email,
      password,
      refreshToken: result.refreshToken,
      guid: result.guid,
    };
  }
}
