import User from './user';

export interface UserRepository {
  list(): Promise<User[]>;
  listOne(guid: string): Promise<User | undefined>;
  insert(user: User): Promise<User>;
  update(user: User): Promise<User | null>;
}
