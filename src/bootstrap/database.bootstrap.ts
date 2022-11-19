import { DataSource } from 'typeorm';

import { Bootstrap } from './bootstrap';
import { AppService, DB_CONFIG } from './app.service';

let appDataSource: DataSource;

export default class DatabaseBootstrap extends Bootstrap {
  initialize(): Promise<any> {
    const dbConfig: DB_CONFIG = AppService.DbConfig;
    const AppDataSource = new DataSource({
      type: 'mysql',
      ...dbConfig,
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
