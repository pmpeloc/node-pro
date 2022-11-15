import { AppDataSource } from './data-source';
import { User } from './entity/User.entity';
import { Car } from './entity/Car.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const car1 = new Car();
    car1.brand = 'Ford';
    car1.model = 'Mustang';
    car1.year = 1969;
    car1.color = 'Black';

    const car2 = new Car();
    car2.brand = 'Toyota';
    car2.model = 'Corolla';
    car2.year = 2010;
    car2.color = 'White';

    const user1 = new User();
    user1.name = 'Juan';
    user1.lastname = 'Perez';
    user1.email = 'juan@mail.com';
    user1.age = 30;
    user1.cars = [car1, car2];

    const userInserted1 = await userRepository.save(user1);
    console.log('User inserted 1: ', userInserted1);

    const user2 = new User();
    user2.name = 'Felipe';
    user2.lastname = 'Ramirez';
    user2.email = 'felipe@mail.com';
    user2.age = 20;
    user2.cars = [car1];

    const userInserted2 = await userRepository.save(user2);
    console.log('User inserted 2: ', userInserted2);
  })
  .catch(console.error);
