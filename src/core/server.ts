import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import { join as pathJoin } from 'path';
import http from 'http';
import { getEnv } from '../config/env';

import helmet from 'helmet';
import morgan from 'morgan';

import { checkEnvConfig } from '../middlewares/checkEnvConfig';
import { redirectOverHttps } from '../middlewares/redirectOverHttps';

import { apiRoutes } from '../routes/api.routes';
import { indexRoutes } from '../routes/index.routes';
import { socketAPI } from './socketAPI';

export function initializeServer() {
  const { NODE_ENV, PORT } = getEnv();

  // Init
  const app = express();
  const server = http.createServer(app);
  const io = new WebSocketServer(server);

  // Settings
  app.set('port', Number(PORT));

  // Middlewares
  app.use(helmet());
  app.use(express.json());

  if (NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.use(redirectOverHttps);
    app.use(express.static(pathJoin(__dirname, '../../client/build')));
    app.use(checkEnvConfig);
  } else {
    app.use(morgan('dev'));
  }

  // Routes
  app.use('/api', apiRoutes);
  app.use(indexRoutes);
  socketAPI(io);

  return app;
}
