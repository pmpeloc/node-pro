import { AppDataSource } from './data-source';
import { User } from './entity/User.entity';
import { Car } from './entity/Car.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const car = new Car();
    car.brand = 'Ford';
    car.model = 'Mustang';
    car.year = 1969;
    car.color = 'Black';

    const car2 = new Car();
    car2.brand = 'Toyota';
    car2.model = 'Corolla';
    car2.year = 2010;
    car2.color = 'White';

    const user = new User();
    user.name = 'Juan';
    user.lastname = 'Perez';
    user.email = 'juan@mail.com';
    user.age = 30;
    user.cars = [car, car2];

    const userInserted = await userRepository.save(user);
    console.log('User inserted: ', userInserted);
  })
  .catch(console.error);
