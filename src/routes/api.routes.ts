import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import {
  nicknameValidation,
  usernameValidation,
  passwordValidation,
  rejectOnValidationErrors,
} from '../middlewares/expressValidator';

const router = Router();

router.post(
  '/register',
  [
    nicknameValidation,
    usernameValidation,
    passwordValidation,
    rejectOnValidationErrors,
  ],
  userController.register
);

router.post(
  '/login',
  [usernameValidation, passwordValidation, rejectOnValidationErrors],
  userController.login
);

export const apiRoutes = router;
