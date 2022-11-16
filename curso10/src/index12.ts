import { AppDataSource } from './data-source';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const medicRepository = conn.getRepository(Medic);

    const id = 5;

    const medic = await medicRepository
      .createQueryBuilder('doctor')
      .select(['doctor.id', 'doctor.name'])
      .where('doctor.id = :id', { id })
      .getOne();

    console.table(medic);
  })
  .catch(console.error);
