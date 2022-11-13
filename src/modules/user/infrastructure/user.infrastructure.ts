import { UserRepository } from '../domain/user.repository';
import User, { UserProperties } from '../domain/user';
import UserFactory from '../domain/user-factory';

const users: User[] = [
  new UserFactory().create('John', 'Doe', 'john@mail.com', '123'),
  new UserFactory().create('Jane', 'Doe', 'jane@mail.com', '123'),
];

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
