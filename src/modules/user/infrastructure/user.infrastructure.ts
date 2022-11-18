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
  async list(): Promise<User[]> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const result = await repo.find();
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

  async listOne(guid: string): Promise<User | undefined> {
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userEntity = await repo.findOne({ where: { guid } });
    return new User({
      guid: userEntity!.guid,
      name: userEntity!.name,
      lastname: userEntity!.lastname,
      email: EmailVO.create(userEntity!.email),
      password: userEntity!.password,
      refreshToken: userEntity!.refreshToken,
      active: userEntity!.active,
    });
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

  async update(user: User): Promise<User | null> {
    const { guid } = user.properties();
    const repo = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const userFound = await repo.findOne({ where: { guid } });
    if (userFound) {
      Object.assign(userFound, user.properties());
      const userEntity = await repo.save(userFound);
      return new User({
        guid: userEntity!.guid,
        name: userEntity!.name,
        lastname: userEntity!.lastname,
        email: EmailVO.create(userEntity!.email),
        password: userEntity!.password,
        refreshToken: userEntity!.refreshToken,
        active: userEntity!.active,
      });
    }
    return null;
  }
}
