import { Request, Response } from 'express';

interface IRoute {
  execute: (request: Request, response: Response) => void;
}

interface IRoute {
  path: string;
}

type Routes = IRoute[];

const routes: Routes = [
  {
    path: 'user/description',
    execute(request, response) {
      response.status(200).send('User description');
    },
  },
  {
    path: 'user/delete',
    execute(request, response) {
      response.status(200).send('User delete');
    },
  },
];

const getRoute = (path: string): IRoute | undefined =>
  routes.find((route: IRoute) => route.path === path);

const exceptionNotFound = (request: Request, response: Response) => {
  response.status(404).send('Path not found');
};

export { getRoute, exceptionNotFound, IRoute, Routes };
