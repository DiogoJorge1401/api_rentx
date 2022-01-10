import { createConnection, getConnectionOptions } from 'typeorm';
export const connection = async () => {
  if (process.env.NODE_ENV === 'test') {
    const defaultOptions = await getConnectionOptions();
    return createConnection(
      Object.assign(defaultOptions, {
        database:
          process.env.NODE_ENV === 'test'
            ? 'rentx_test'
            : defaultOptions.database,
      })
    );
  }
  return createConnection();
};
