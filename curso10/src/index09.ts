import { AppDataSource } from './data-source';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const medicRepository = conn.getRepository(Medic);

    const medics = await medicRepository.find({
      order: { lastname: 'desc', name: 'asc' },
    });

    console.table(medics);
  })
  .catch(console.error);
