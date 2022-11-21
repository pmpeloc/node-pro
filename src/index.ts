import Application from './app';
import { Bootstrap } from './bootstrap/bootstrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import RedisBootstrap from './bootstrap/redis.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

const serverBootstrap: Bootstrap = new ServerBootstrap(Application);
const databaseBootstrap: Bootstrap = new DatabaseBootstrap();
const redisBootstrap: Bootstrap = new RedisBootstrap();

(async () => {
  try {
    await databaseBootstrap.initialize();
    await redisBootstrap.initialize();
    await serverBootstrap.initialize();

    console.log('Server started successfully');
    console.log('Database started successfully');
    console.log('Redis started successfully');
  } catch (error) {
    console.error(error);
  }
})();
