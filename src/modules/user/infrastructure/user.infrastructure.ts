import { err, ok, Result } from 'neverthrow';

import User from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { EmailVO } from '../domain/value-objects/email.vo';
import { UserEntity } from './user.entity';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';
import { UserNotFoundException } from '../domain/exceptions/user.exception';
import { UserUpdate } from '../domain/user';

export default class UserInfrastructure implements UserRepository {
  async list(): Promise<User[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.find({ where: { active: true } });
    return result.map(
      (el: UserEntity) =>
        new User({
          guid: el.guid,
          name: el.name,
          lastname: el.lastname,
          email: EmailVO.create(el.email),
          password: el.password,
          refreshToken: el.refreshToken,
          active: el.active,
        })
    );
  }

  async listOne(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userEntity = await repo.findOne({ where: { guid } });
    if (!userEntity) {
      return err(new UserNotFoundException());
    } else {
      return ok(
        new User({
          guid: userEntity!.guid,
          name: userEntity!.name,
          lastname: userEntity!.lastname,
          email: EmailVO.create(userEntity!.email),
          password: userEntity!.password,
          refreshToken: userEntity!.refreshToken,
          active: userEntity!.active,
        })
      );
    }
  }

  async insert(user: User): Promise<User> {
    const userInsert = new UserEntity();
    const { guid, name, lastname, email, password, refreshToken, active } =
      user.properties();
    Object.assign(userInsert, {
      guid,
      name,
      lastname,
      email: email.value,
      password,
      refreshToken,
      active,
    });
    await DatabaseBootstrap.dataSource
      .getRepository(UserEntity)
      .save(userInsert);
    // await this.dataSource.getRepository(UserEntity).save(userInsert);
    return user;
  }

  async update(
    guid: string,
    user: Partial<UserUpdate>
  ): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userFound = await repo.findOne({ where: { guid, active: true } });
    if (userFound) {
      Object.assign(userFound, user);
      const userEntity = await repo.save(userFound);
      return ok(
        new User({
          guid: userEntity!.guid,
          name: userEntity!.name,
          lastname: userEntity!.lastname,
          email: EmailVO.create(userEntity!.email),
          password: userEntity!.password,
          refreshToken: userEntity!.refreshToken,
          active: userEntity!.active,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }

  async delete(guid: string): Promise<Result<User, UserNotFoundException>> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userFound = await repo.findOne({ where: { guid, active: true } });
    if (userFound) {
      userFound.active = false;
      const userEntity = await repo.save(userFound);
      return ok(
        new User({
          guid: userEntity!.guid,
          name: userEntity!.name,
          lastname: userEntity!.lastname,
          email: EmailVO.create(userEntity!.email),
          password: userEntity!.password,
          refreshToken: userEntity!.refreshToken,
          active: userEntity!.active,
        })
      );
    } else {
      return err(new UserNotFoundException());
    }
  }
}
