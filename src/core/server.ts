import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
import { join as pathJoin } from 'path';
import http from 'http';
import helmet from 'helmet';

import { getEnv } from '../config/env';

import { checkMissingEnv } from '../middlewares/checkMissingEnv';
import { redirectOverHttps } from '../middlewares/redirectOverHttps';

import { apiRoutes } from '../routes/api.routes';
import { indexRoutes } from '../routes/index.routes';
import { socketAPI } from './socketAPI';

export async function initializeServer() {
  const { NODE_ENV, PORT } = getEnv();

  // Init
  const app = express();
  const server = http.createServer(app);
  let io: WebSocketServer;

  // Settings
  app.set('port', Number(PORT));

  // Middlewares
  app.use(helmet());
  app.use(express.json());

  if (NODE_ENV === 'production') {
    io = new WebSocketServer(server);

    app.enable('trust proxy');
    app.use(redirectOverHttps);
    app.use(express.static(pathJoin(__dirname, '../../client/build')));
    app.use(checkMissingEnv(Object.keys(getEnv())));
  } else {
    const corsConfig = {
      origin: 'http://localhost:3000',
    };

    io = new WebSocketServer(server, {
      cors: corsConfig,
    });

    const morgan = (await import('morgan')).default;
    app.use(morgan('dev'));

    const cors = (await import('cors')).default;
    app.use(cors(corsConfig));
  }

  // Routes
  app.use('/api', apiRoutes);
  app.use(indexRoutes);
  socketAPI(io);

  return { socketServer: server, app };
}
