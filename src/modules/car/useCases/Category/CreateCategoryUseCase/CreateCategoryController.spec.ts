import { app } from '@shared/infra/http/app';
import { connection as createConnection } from '@shared/infra/typeorm';
import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';


describe('Create Category Controller', () => {
  let connection: Connection;
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
    const password = await hash('1234', 10);
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
  it('should be abe to create a new category', async () => {
    const res = await request(app).post('/session').send({
      email: 'sue12@mail.com',
      password: '1234',
    });
    const { refresh_token } = res.body;

    const response = await request(app)
      .post('/category')
      .send({
        name: 'teste',
        description: 'description',
      })
      .set({
        Authorization: `bearer ${refresh_token}`,
      });
    expect(response.statusCode).toBe(201);
  });
  it('should not be able to create a new category with same name', async () => {
    const res = await request(app).post('/session').send({
      email: 'sue12@mail.com',
      password: '1234',
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
      .post('/category')
      .send({
        name: 'teste',
        description: 'description',
      })
      .set({
        Authorization: `bearer ${refresh_token}`,
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Category already exist!');
  });
});
