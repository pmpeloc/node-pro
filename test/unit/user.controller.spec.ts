import * as httpMock from 'node-mocks-http';
import Controller from '../../src/modules/user/interfaces/http/controller';

import { MockUserApplication } from './repositories/mock-user.application';

let req: any;
let res: any;
let next: any;

describe('user.controller', () => {
  let mockUserApplication: MockUserApplication;
  let userController: Controller;
  beforeAll(() => {
    // Arrange
    mockUserApplication = new MockUserApplication();
    userController = mockUserApplication.getController();
  });

  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  });

  it('List users', async () => {
    // Act
    await userController.list(req, res);
    // Assert
    mockUserApplication.assertListUsers(res);
  });

  it('List one', async () => {
    // Act
    req.params.guid = 'efaff3b2-85c0-4b39-bb1d-0bbf25390d3d';
    await userController.listOne(req, res, next);
    // Assert
    mockUserApplication.assertListOneUser(res);
  });
});
