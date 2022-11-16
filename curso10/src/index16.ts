import { Brackets } from 'typeorm';
import { AppDataSource } from './data-source';
import { Medic } from './entity/Medic.entity';

AppDataSource.initialize()
  .then(async (conn) => {
    const medics = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age > :age', { age: 30 })
      .getRawMany();
    console.log(medics);

    const medicsByAge = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age >= :age1 and medic.age <= :age2', {
        age1: 20,
        age2: 40,
      })
      .getRawMany();
    console.log(medicsByAge);

    const medicsByAge2 = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age >= :age1', {
        age1: 20,
      })
      .andWhere('medic.age <= :age2', { age2: 40 })
      .getRawMany();
    console.log(medicsByAge2);

    const medicsByAge3 = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age <= :age', {
        age: 30,
      })
      .orWhere('medic.age >= :age', { age: 60 })
      .getRawMany();
    console.log(medicsByAge3);

    const medicsByBrackets = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, 'medic')
      .where('medic.age > :age', {
        age: 20,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where('medic.name = :name1', { name1: 'Alicia' }).orWhere(
            'medic.name = :name2',
            { name2: 'Carmen' }
          );
        })
      )
      .getRawMany();
    console.log(medicsByBrackets);
  })
  .catch(console.error);
