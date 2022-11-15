import { AppDataSource } from './data-source';
import { User } from './entity/User.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository('User');
    const listUsers = await userRepository.find();
    console.table(listUsers);
    const user = await userRepository.findOne({ where: { id: 1 } });
    console.info(user);
    const newUser = new User();
    newUser.name = 'John';
    newUser.lastname = 'Doe';
    newUser.email = 'john@mail.com';
    newUser.age = 30;
    const userSaved = await userRepository.save(newUser);
    console.log('Save: ', userSaved);
    const [records, count] = await userRepository.findAndCount();
    console.log('Find and Count: ', records, count);
  })
  .catch(console.error);
