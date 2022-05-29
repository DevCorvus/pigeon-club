import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { createConnection } from 'typeorm';
import { databaseConfig } from './config/database';
import initializeExpressSocketServer from './config/server';

createConnection(databaseConfig())
  .then(initializeExpressSocketServer)
  .catch((err) => console.log(err));
