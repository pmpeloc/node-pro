import { UserRepository } from '../domain/user.repository';
import User, { UserUpdate } from '../domain/user';

export default class UserApplication {
  constructor(private readonly userRepository: UserRepository) {}

  list() {
    return this.userRepository.list();
  }

  listOne(guid: string) {
    return this.userRepository.listOne(guid);
  }

  async insert(user: User) {
    // const {password} = user.properties();
    // user.update({password: await UserService.hashPassword(password)})
    return this.userRepository.insert(user);
  }

  async update(guid: string, user: Partial<UserUpdate>) {
    return this.userRepository.update(guid, user);
  }

  async delete(guid: string) {
    return this.userRepository.delete(guid);
  }
}
