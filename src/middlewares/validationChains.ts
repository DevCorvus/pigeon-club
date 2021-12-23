import { body } from 'express-validator';

export const nicknameValidation = body('nickname')
  .not().isEmpty()
  .trim()
  .isAlphanumeric()
  .isLength({ min: 2, max: 100 });

export const usernameValidation = body('username')
  .not().isEmpty()
  .trim()
  .isAlphanumeric()
  .toLowerCase()
  .isLength({ min: 4, max: 50 });

export const passwordValidation = body('password')
  .not().isEmpty()
  .trim()
  .isAlphanumeric()
  .isLength({ min: 8, max: 200 });