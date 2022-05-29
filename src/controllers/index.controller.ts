import { Request, Response } from 'express';
import { getEnv } from '../config/env';
import { join as pathJoin } from 'path';

export const get = (req: Request, res: Response) => {
  const { NODE_ENV } = getEnv();
  if (NODE_ENV !== 'production') return res.sendStatus(404);

  res.sendFile('index.html', {
    root: pathJoin(__dirname, '../../client/build/'),
  });
};
