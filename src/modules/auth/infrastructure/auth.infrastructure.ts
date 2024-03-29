import { Auth } from '../domain/auth';
import { AuthRepository, UserType } from '../domain/auth.repository';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { UserEntity } from '../../user/infrastructure/user.entity';

export class AuthInfrastructure implements AuthRepository {
  async getUser(auth: Auth): Promise<UserType | null> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { email: auth.properties().email },
      relations: ['roles'],
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
      roles: result.roles.map((rol) => rol.name),
    };
  }

  async getUserByRefreshToken(refreshToken: string): Promise<UserType | null> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.findOne({
      where: { refreshToken },
      relations: ['roles'],
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
      roles: result.roles.map((role) => role.name),
    };
  }
}
