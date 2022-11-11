import http from 'http';

interface IRoute {
  execute: (
    request: http.IncomingMessage,
    response: http.ServerResponse
  ) => void;
}

interface IRoute {
  path: string;
}

type Routes = IRoute[];

const routes: Routes = [
  {
    path: 'user/description',
    execute(request, response) {
      response.writeHead(200, { 'content-type': 'text/plain' });
      response.write('Server is running');
      response.end();
    },
  },
  {
    path: 'user/delete',
    execute(request, response) {
      response.writeHead(200, { 'content-type': 'text/plain' });
      response.write('User deleted successfully');
      response.end();
    },
  },
];

const getRoute = (path: string): IRoute | undefined =>
  routes.find((route: IRoute) => route.path === path);

const exceptionNotFound = (
  request: http.IncomingMessage,
  response: http.ServerResponse
) => {
  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('Path not found');
};

export { getRoute, exceptionNotFound, IRoute, Routes };
