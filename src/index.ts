import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { databaseConnection } from './core/database';
import { initializeServer } from './core/server';

(async () => {
  await databaseConnection();

  const app = initializeServer();

  app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
  });
})();
