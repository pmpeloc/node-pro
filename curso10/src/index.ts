import { AppDataSource } from './data-source';
import { Car } from './entity/Car.entity';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const queryRunner = AppDataSource.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    const manager = queryRunner.manager;

    try {
      await manager
        .createQueryBuilder()
        .from(Medic, 'medic')
        .insert()
        // .values({ name: 'Milagros', lastname: 'Lara' }) // Forzando el error
        .values({ name: 'Carlos', lastname: 'Lara', age: 88 })
        .execute();

      await manager
        .createQueryBuilder()
        .from(Car, 'car')
        .insert()
        .values({ brand: 'Roto', model: 'Mustang', year: 1970, color: 'Green' })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  })

  .catch(console.error);
