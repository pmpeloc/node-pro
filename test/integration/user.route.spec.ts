import request from 'supertest';

import DatabaseBootstrap from '../../src/bootstrap/database.bootstrap';
import { Bootstrap } from '../../src/bootstrap/bootstrap';
import app from '../../src/app';

const tokenValid =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiUm9sZTEiLCJsYXN0bmFtZSI6IlJvbCIsInJvbGVzIjpbIkFETUlOSVNUUkFUT1IiLCJPUEVSQVRPUiJdLCJpYXQiOjE2NjkxNzE0ODAsImV4cCI6MTcwMDcwNzQ4MH0.8O6BrO-1BJTbLFhZQV0TnpzYxNsuBEzkgFZXEpLEOo4';
const tokenExpired =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlsiQURNSU5JU1RSQVRPUiIsIk9QRVJBVE9SIl0sImlhdCI6MTY2MzQzMDE3NSwiZXhwIjoxNjYzNDMwNzc1fQ.y9WHbAT2uEcj8Dkw_obYH945Punh0btNzce-li1cJNc';
const tokenInvalid =
  '3eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiU2VyZ2lvIiwibGFzdG5hbWUiOiJIaWRhbGdvIiwicm9sZXMiOlsiQURNSU5JU1RSQVRPUiIsIk9QRVJBVE9SIl0sImlhdCI6MTY2MzQzMDE3NSwiZXhwIjoxNjYzNDMwNzc1fQ.y9WHbAT2uEcj8Dkw_obYH945Punh0btNzce-li1cJNc';

const TIMEOUT = 24 * 60 * 60 * 1000;

describe('User routes', () => {
  let databaseBootstrap: Bootstrap = new DatabaseBootstrap();
  let rq: request.SuperTest<request.Test>;

  beforeAll(async () => {
    await databaseBootstrap.initialize();
  });

  beforeEach(() => {
    // Arrange
    rq = request(app);
  });

  afterAll(() => {
    databaseBootstrap.close();
  });

  it(
    'List users without token',
    async () => {
      // Act
      const response: any = await rq.get('/user');
      // Assert
      expect(response.status).toBe(401);
    },
    TIMEOUT
  );

  it(
    'List users with valid token',
    async () => {
      // Act
      const response: any = await rq
        .get('/user')
        .set('Authorization', `Bearer ${tokenValid}`);
      // Assert
      const objJson = JSON.parse(response.text);
      expect(response.status).toBe(200);
      expect(objJson[0]).toHaveProperty('name');
      expect(objJson[0]).toHaveProperty('lastname');
      expect(objJson[0]).toHaveProperty('guid');
    },
    TIMEOUT
  );

  it(
    'List users with expired token',
    async () => {
      // Act
      const response: any = await rq
        .get('/user')
        .set('Authorization', `Bearer ${tokenExpired}`);
      // Assert
      const objJson = JSON.parse(response.text);
      // expect(response.status).toBe(409);
      expect(objJson).toHaveProperty('message');
      expect(objJson).toHaveProperty('status');
      expect(objJson).toHaveProperty('traceId');
      expect(objJson).toHaveProperty('name');
      // expect(objJson.message).toBe('El token expiró');
    },
    TIMEOUT
  );

  it(
    'List users with invalid token',
    async () => {
      // Act
      const response: any = await rq
        .get('/user')
        .set('Authorization', `Bearer ${tokenInvalid}`);
      // Assert
      const objJson = JSON.parse(response.text);
      expect(response.status).toBe(401);
      expect(objJson).toHaveProperty('message');
      expect(objJson).toHaveProperty('status');
      expect(objJson).toHaveProperty('traceId');
      expect(objJson).toHaveProperty('name');
      expect(objJson.message).toBe('El token es inválido');
    },
    TIMEOUT
  );
});
