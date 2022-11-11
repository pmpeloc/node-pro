import Application from './app';
import { Bootstrap, ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap: Bootstrap = new ServerBootstrap(Application);

(async () => {
  try {
    const resultServer = await serverBootstrap.initialize();
    console.log(resultServer);
  } catch (error) {
    console.error(error);
  }
})();
