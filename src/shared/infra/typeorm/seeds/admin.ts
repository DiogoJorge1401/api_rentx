import { connection } from '..';
import { v4 as uuid } from 'uuid';
import { hash } from 'bcrypt';

async function create() {
  const c = await connection();
  const result = await c.query(`SELECT * FROM users WHERE name = 'suegoidkun';`);
  if (!result.length) {
    const password = await hash('sue1234', 10);
    await c.query(
      `
      INSERT INTO USERS(id,name,password,email,driver_license,admin)
      VALUES('${uuid()}','suegoidkun','${password}','diogogame32@mail.com','82771329',true)
      `
    );
  }

  await c.close();
}

create().then(() => console.log('User admin created!'));
