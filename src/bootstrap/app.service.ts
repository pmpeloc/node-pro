import yenv from 'yenv';

const env = yenv('.env');

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
    return env.PORT || 4005;
  }

  static get DbConfig(): DB_CONFIG {
    return {
      host: env.DB_HOST || 'localhost',
      port: env.DB_PORT || 3310,
      username: env.DB_USER || 'user',
      entities: [env.DB_ENTITIES || 'dist/**/*.entity{.ts,.js}'],
      password: env.DB_PASSWORD.toString() || '123456',
      database: env.DB_NAME || 'curso10',
      synchronize: env.DB_SYNC || false,
      logging: env.DB_LOGG || false,
    };
  }
}
