import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export function rejectOnValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const param = errors.array()[0].param;
    return res.status(409).send(`Invalid ${param}`);
  }
  next();
}

export const nicknameValidation = body('nickname')
  .not()
  .isEmpty()
  .trim()
  .isAlphanumeric()
  .isLength({ min: 2, max: 100 });

export const usernameValidation = body('username')
  .not()
  .isEmpty()
  .trim()
  .isAlphanumeric()
  .toLowerCase()
  .isLength({ min: 4, max: 50 });

export const passwordValidation = body('password')
  .not()
  .isEmpty()
  .trim()
  .isAlphanumeric()
  .isLength({ min: 8, max: 200 });
