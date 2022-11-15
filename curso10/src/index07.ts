import { AppDataSource } from './data-source';
import { User } from './entity/User.entity';
import { Car } from './entity/Car.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);
    const carRepository = conn.getRepository(Car);

    const users = await userRepository.find();
    console.log('Users: ', JSON.stringify(users, null, '\t'));
  })
  .catch(console.error);
