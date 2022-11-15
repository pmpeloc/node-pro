import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3310,
  username: 'user',
  password: '123456',
  database: 'curso10',
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.entity.ts'],
  migrations: [],
  subscribers: [],
});
