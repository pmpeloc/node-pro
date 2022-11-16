import { AppDataSource } from './data-source';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const medics = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age BETWEEN :age1 and :age2', { age1: 20, age2: 30 })
      .getRawMany();
    console.log(medics);
    const medicByRangeAge = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age IN (:ages)', { ages: [21, 22] })
      .getRawMany();
    console.log(medicByRangeAge);
  })
  .catch(console.error);
