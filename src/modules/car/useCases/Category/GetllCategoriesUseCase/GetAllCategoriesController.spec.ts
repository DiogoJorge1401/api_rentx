import { v4 as uuid } from 'uuid';
import { connection as createConnection } from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import { Connection } from 'typeorm';
import request from 'supertest';
import { app } from '@shared/infra/http/app';

describe('Get All Categories Controller', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash('sue1234', 10);
    await connection.query(
      `
    INSERT INTO USERS(id,name,password,email,driver_license,admin)
    VALUES('${uuid()}','suegoidkun','${password}','sue12@mail.com','82771329',true)
    `
    );
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to list all categories', async () => {
    const res = await request(app).post('/session').send({
      email: 'sue12@mail.com',
      password: 'sue1234',
    });
    const { refresh_token } = res.body;

    await request(app)
      .post('/category')
      .send({
        name: 'teste',
        description: 'description',
      })
      .set({
        Authorization: `bearer ${refresh_token}`,
      });

    const response = await request(app)
      .get('/category')
      .set({
        Authorization: `bearer ${refresh_token}`,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name', 'teste');
  });
});
