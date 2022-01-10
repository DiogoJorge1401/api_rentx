import { createConnection, getConnectionOptions } from 'typeorm';
export const connection = async (host = 'database') => {
  if (process.env.NODE_ENV === 'test') {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
      Object.assign(defaultOptions, {
        host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
        database:
          process.env.NODE_ENV === 'test'
            ? 'rentx_test'
            : defaultOptions.database,
      })
    );
  }
  return createConnection();
};
