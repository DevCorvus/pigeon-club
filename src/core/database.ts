import { ConnectionOptions, createConnection } from 'typeorm';
import { getEnv } from '../config/env';
import { User } from '../entity/User';
import { Message } from '../entity/Message';

const databaseConfig = (): ConnectionOptions => {
  const { NODE_ENV, DATABASE_URL } = getEnv();

  if (NODE_ENV === 'production') {
    return {
      type: 'postgres',
      url: DATABASE_URL,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Message],
    };
  }

  // Default (Development)
  return {
    type: 'sqlite',
    database: 'test.sqlite',
    synchronize: true,
    logging: true,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
  };
};

export async function databaseConnection() {
  try {
    const config = databaseConfig();
    const conn = await createConnection(config);
    console.log('Connected to database:', conn.driver.database);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
