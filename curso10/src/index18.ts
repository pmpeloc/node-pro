import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async (conn) => {
    const query = await AppDataSource.manager.query(
      'select name, lastname, id from medic'
    );

    console.log(query);

    const callStoredProcedure = await AppDataSource.manager.query(
      'call get_medics_by_id(?)',
      [4]
    );

    console.log(callStoredProcedure);

    await AppDataSource.manager.query('call insert_medic(?, ?, ?)', [
      'Pepe',
      'Zapata',
      35,
    ]);
  })
  .catch(console.error);
