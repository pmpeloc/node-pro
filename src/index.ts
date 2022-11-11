import App from './app';
import { Bootstrap, ServerBootstrap } from './bootstrap/server.bootstrap';

const serverBootstrap: Bootstrap = new ServerBootstrap(App.requestListener);

(async () => {
  try {
    const resultServer = await serverBootstrap.initialize();
    console.log(resultServer);
  } catch (error) {
    console.error(error);
  }
})();
