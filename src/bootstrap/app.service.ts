export interface DB_CONFIG {
  host: string;
  port: number;
  entities: string[];
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

export class AppService {
  static get PORT() {
    return process.env.PORT || 4005;
  }

  static get DbConfig(): DB_CONFIG {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? +process.env.DB_PORT : 3310,
      username: process.env.DB_USER || 'user',
      entities: [process.env.DB_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
      password: process.env.DB_PASSWORD || '123456',
      database: process.env.DB_NAME || 'curso10',
      synchronize: process.env.DB_SYNC === 'true' ? true : false,
      logging: process.env.DB_LOGG === 'true' ? true : false,
    };
  }
}
