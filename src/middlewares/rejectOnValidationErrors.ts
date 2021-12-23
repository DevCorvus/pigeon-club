import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const rejectOnValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const param = errors.array()[0].param;
    return res.status(409).send(`Invalid ${param}`);
  };
  next();
}
