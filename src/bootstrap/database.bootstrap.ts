import { DataSource } from 'typeorm';

import { Bootstrap } from './bootstrap';

let appDataSource: DataSource;

export default class DatabaseBootstrap extends Bootstrap {
  initialize(): Promise<any> {
    const AppDataSource = new DataSource({
      type: 'mysql',
      host: 'localhost',
      port: 3310,
      username: 'user',
      password: '123456',
      database: 'curso10',
      synchronize: true,
      logging: false,
      entities: ['src/**/*.entity.ts'],
      migrations: [],
      subscribers: [],
    });
    appDataSource = AppDataSource;
    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return appDataSource;
  }
}
