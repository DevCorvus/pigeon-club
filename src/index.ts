import 'reflect-metadata';

import { loadLocalEnvIfRequired } from './utils/env';
import { databaseConnection } from './core/database';
import { initializeServer } from './core/server';

(async () => {
  await loadLocalEnvIfRequired();
  await databaseConnection();

  const { socketServer, app } = await initializeServer();

  socketServer.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
  });
})();
