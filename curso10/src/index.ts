import { AppDataSource } from './data-source';
import { Hospital } from './entity/Hospital.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const report = await AppDataSource.manager
      .createQueryBuilder()
      .from(Hospital, 'hospital')
      .select(['hospital.title', 'medic.name', 'medic.lastname'])
      .innerJoin('hospital.medics', 'medic') // Relación de registros entre Hospital y Medic
      // .leftJoin('hospital.medics', 'medic') // Trae todo lo que esta en Hospital sin importar la relación con Medic
      .where('char_length(medic.name) > 3')
      .getRawMany();

    console.table(report);
  })
  .catch(console.error);
