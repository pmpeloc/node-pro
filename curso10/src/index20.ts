import { EntityManager } from 'typeorm';

import { AppDataSource } from './data-source';
import { Car } from './entity/Car.entity';
import { Medic } from './entity/Medic.entity';
import { UnitOfWork } from './unit-of-work/uow';

AppDataSource.initialize()
  .then(async (conn) => {
    const uow = new UnitOfWork(AppDataSource.manager);

    await uow.start();

    const manager: EntityManager = uow.getManager();

    const work = async () => {
      const medic = new Medic();
      medic.name = 'Juan';
      medic.lastname = 'Paredes';
      medic.age = 82; // Comment this line for generated error

      const car = new Car();
      car.brand = 'Hyundai';
      car.model = 'Teslo';
      car.year = 1998;
      car.color = 'Blue';

      await manager.save(medic);
      await manager.save(car);
    };

    await uow.complete(work);
  })

  .catch(console.error);
