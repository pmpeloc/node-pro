import User, { UserProperties } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import UserFactory from '../domain/user-factory';
import { EmailVO } from '../domain/value-objects/email.vo';
import { UserEntity } from './user.entity';
import DatabaseBootstrap from '../../../bootstrap/database.bootstrap';

let users: User[] = [];

const promisesUsers = [
  new UserFactory().create(
    'John',
    'Doe',
    EmailVO.create('john@mail.com'),
    '123'
  ),
  new UserFactory().create(
    'Jane',
    'Doe',
    EmailVO.create('jane@mail.com'),
    '123'
  ),
];

Promise.all(promisesUsers).then((result) => (users = result));

export default class UserInfrastructure implements UserRepository {
  list(): UserProperties[] {
    return users
      .filter((el: User) => el.properties().active)
      .map((el: User) => el.properties());
  }

  listOne(guid: string): User | undefined {
    const userFind = users
      .filter((el: User) => el.properties().active)
      .find((el: User) => el.properties().guid === guid);
    return userFind;
  }

  async insert(user: User): Promise<UserProperties> {
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
    return user.properties();
  }

  update(user: User): any {
    const { guid } = user.properties();
    const userIndex: number = users.findIndex(
      (el: User) => el.properties().guid === guid
    );
    users[userIndex] = user;
    return user;
  }
}
