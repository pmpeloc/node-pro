import IORedis from 'ioredis';

import { REDIS_CONFIG, AppService } from './app.service';
import { Bootstrap } from './bootstrap';

let appRedis: IORedis;

export default class RedisBootstrap extends Bootstrap {
  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const redisConfig: REDIS_CONFIG = AppService.RedisConfig;
      const client = new IORedis(redisConfig);
      client
        .on('connect', () => {
          console.log('Connected to Redis');
          resolve(true);
        })
        .on('error', (err) => {
          console.error('Error connecting to Redis');
          reject(err);
        });
      appRedis = client;
    });
  }

  getConnection() {
    return appRedis;
  }

  static async get(key: string) {
    return await appRedis.get(key);
  }

  static async set(key: string, value: string) {
    return await appRedis.set(key, value, 'PX', 1000 * 60 * 60 * 24);
  }

  static async clear(prefix = '') {
    const keys = await appRedis.keys(`${prefix}*`);
    const pipeline = appRedis.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });

    return pipeline.exec();
  }
}
