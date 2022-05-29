import 'reflect-metadata';

import { loadLocalEnvIfRequired } from './utils/env';
import { databaseConnection } from './core/database';
import { initializeServer } from './core/server';

(async () => {
  await loadLocalEnvIfRequired();
  await databaseConnection();

  const app = await initializeServer();

  app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
  });
})();
