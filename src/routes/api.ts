import { Router } from 'express';
import controller from '../controllers/user.controller';
import {
  nicknameValidation,
  usernameValidation,
  passwordValidation,
} from '../middlewares/validationChains';
import { rejectOnValidationErrors } from '../middlewares/rejectOnValidationErrors';

const router = Router();

router.post(
  '/register',
  [
    nicknameValidation,
    usernameValidation,
    passwordValidation,
    rejectOnValidationErrors,
  ],
  controller.register
);

router.post(
  '/login',
  [usernameValidation, passwordValidation, rejectOnValidationErrors],
  controller.login
);

export default router;
