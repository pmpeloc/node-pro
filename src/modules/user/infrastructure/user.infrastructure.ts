import { UserRepository } from '../domain/user.repository';
import User, { UserProperties } from '../domain/user';
import UserFactory from '../domain/user-factory';
import { EmailVO } from '../domain/value-objects/email.vo';

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

  insert(user: User): UserProperties {
    users.push(user);
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
