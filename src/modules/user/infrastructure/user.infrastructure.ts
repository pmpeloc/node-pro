import { UserRepository } from '../domain/user.repository';
import User from '../domain/user';

const users: User[] = [
  new User({
    id: 1,
    name: 'John',
    lastname: 'Doe',
    email: 'john@mail.com',
    password: '123',
    refreshToken: 'ABC123',
  }),
  new User({
    id: 2,
    name: 'Jane',
    lastname: 'Doe',
    email: 'jane@mail.com',
    password: '123',
    refreshToken: 'ABC123',
  }),
];

export default class UserInfrastructure implements UserRepository {
  list(): User[] {
    return users;
  }

  listOne(id: number): User {
    return Object.assign(
      {},
      users.find((el: User) => el.properties().id === id)
    );
  }

  insert(user: User): void {
    console.info(`User inserted: ${user}`);
  }

  update(user: User): void {
    console.info(`User updated: ${user}`);
  }

  delete(user: User): void {
    console.info(`User deleted: ${user}`);
  }
}
