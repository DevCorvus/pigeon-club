import type { ConnectionOptions } from 'typeorm';
import { NODE_ENV, DATABASE_URL } from './env';
import { User } from '../entity/user';
import { Message } from '../entity/message';

export const databaseConfig = (): ConnectionOptions => {
  if (NODE_ENV === 'production') {
    return {
      type: 'postgres',
      url: DATABASE_URL,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Message]
    };
  }

  // Default (Development)
  return {
    type: 'postgres',
    host: 'localhost',
    port: 4444,
    username: 'postgres',
    password: 'andromeda2002',
    database: 'socket',
    synchronize: true,
    logging: false,
    entities: [
      'src/entity/**/*.ts'
    ],
    migrations: [
      'src/migration/**/*.ts'
    ],
    subscribers: [
      'src/subscriber/**/*.ts'
    ]
  };
};