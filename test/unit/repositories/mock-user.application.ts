// Packages
import { ok } from 'neverthrow';
// Modules
import UserApplication from '../../../src/modules/user/application/user.application';
import Controller from '../../../src/modules/user/interfaces/http/controller';
import User from '../../../src/modules/user/domain/user';
import { EmailVO } from '../../../src/modules/user/domain/value-objects/email.vo';
import UserInfrastructure from '../../../src/modules/user/infrastructure/user.infrastructure';
// Mock
import mockUsers from '../mocks/users.json';
import mockListOneUserResponse from '../mocks/list-one-user.response.json';
import mockListUserResponse from '../mocks/list-user.response.json';

export class MockUserApplication {
  constructor() {
    const emailResult = EmailVO.create('sergio@correo.com');
    if (emailResult.isErr()) {
      throw new Error(emailResult.error.message);
    }

    (UserApplication as jest.Mock) = jest.fn().mockReturnValue({
      list: jest
        .fn()
        .mockResolvedValue(
          mockUsers.map((mock) => ({ ...mock, properties: () => mock }))
        ),
      listOne: jest.fn().mockResolvedValue({
        ...mockUsers[0],
        isErr: () => false,
        isOk: () => true,
        value: {
          properties: () => mockUsers[0],
        },
      }),
    });

    (UserInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      list: jest.fn(),
      listOne: jest.fn().mockResolvedValue(
        ok(
          new User({
            guid: mockUsers[0].guid,
            name: mockUsers[0].name,
            lastname: mockUsers[0].lastname,
            email: emailResult.value,
            password: mockUsers[0].password,
            refreshToken: mockUsers[0].refreshToken,
            active: mockUsers[0].active,
            roles: [],
          })
        )
      ),
    });
  }

  getController() {
    const userInfrastructure = new UserInfrastructure();
    const userApplication = new UserApplication(userInfrastructure);

    return new Controller(userApplication);
  }

  assertListUsers(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toEqual(mockListUserResponse);
  }

  assertListOneUser(res: any) {
    const result = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(result).toHaveProperty('guid');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('lastname');
  }
}
