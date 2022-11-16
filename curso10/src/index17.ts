import { Brackets } from 'typeorm';
import { AppDataSource } from './data-source';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const sumAges = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .select('sum(medic.age) sum_ages')
      .getRawMany();

    console.log(sumAges);

    const medicsById = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .select('medic.name, medic.id')
      .having('medic.id > :id', { id: 6 })
      .getRawMany();

    console.log(medicsById);

    const medicsOrdered = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .select('medic.name, medic.lastname')
      .orderBy('medic.name', 'DESC')
      .addOrderBy('medic.lastname', 'ASC')
      .offset(4)
      .limit(4)
      .getRawMany();

    console.log(medicsOrdered);
  })
  .catch(console.error);
