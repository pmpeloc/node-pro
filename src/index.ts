import Application from './app';
import { Bootstrap } from './bootstrap/bootstrap';
import DatabaseBootstrap from './bootstrap/database.bootstrap';
import ServerBootstrap from './bootstrap/server.bootstrap';

const serverBootstrap: Bootstrap = new ServerBootstrap(Application);
const databaseBootstrap: Bootstrap = new DatabaseBootstrap();

(async () => {
  try {
    await databaseBootstrap.initialize();
    await serverBootstrap.initialize();

    console.log('Server started successfully');
    console.log('Database started successfully');
  } catch (error) {
    console.error(error);
  }
})();
