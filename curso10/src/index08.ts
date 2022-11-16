import { AppDataSource } from './data-source';
import { User } from './entity/User.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const users = await userRepository.find();
    const cars = await users[1].cars;
    console.log('Users', users);
    console.log('Cars: ', JSON.stringify(cars, null, '\t'));
  })
  .catch(console.error);
