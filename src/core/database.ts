import { DataSource, DataSourceOptions } from 'typeorm';
import { getEnv } from '../config/env';
import { User } from '../entity/User';
import { Message } from '../entity/Message';

const databaseConfig = (): DataSourceOptions => {
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

export const db = new DataSource(databaseConfig());

export async function databaseConnection() {
  try {
    const conn = await db.initialize();
    console.log('Connected to database:', conn.driver.database);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
