import type { Request, Response } from 'express';
import { NODE_ENV } from '../config/env';
import { join as pathJoin } from 'path';

const index = (req: Request, res: Response) => {
  if (NODE_ENV !== 'production') return res.sendStatus(404);
  res.sendFile('index.html', {
    root: pathJoin(__dirname, '../../client/build/'),
  });
};

export default {
  index,
};
