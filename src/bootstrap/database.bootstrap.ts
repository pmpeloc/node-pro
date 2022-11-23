import { DataSource } from 'typeorm';

import { Bootstrap } from './bootstrap';
import { AppService, IDbConfig } from './app.service';

let appDataSource: DataSource;

export default class DatabaseBootstrap extends Bootstrap {
  initialize(): Promise<any> {
    const dbConfig: IDbConfig = AppService.DbConfig;
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

  close() {
    appDataSource.destroy();
  }
}
