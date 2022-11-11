import http from 'http';

import { exceptionNotFound, getRoute, IRoute } from './routes';

export default class App {
  static requestListener(
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) {
    const route: IRoute | undefined = getRoute(request.url as string);
    if (route) {
      route.execute(request, response);
    } else {
      exceptionNotFound(request, response);
    }
  }
}
