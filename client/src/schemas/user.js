import Joi from 'joi';

const nickname = Joi.string()
  .trim()
  .alphanum()
  .min(2)
  .max(100)
  .required()
  .options({ convert: false });

export const nicknameSchema = Joi.object({ nickname });

export const userSchema = Joi.object({
  nickname,
  username: Joi.string()
    .trim()
    .alphanum()
    .lowercase()
    .min(4)
    .max(50)
    .required(),
  password: Joi.string().trim().alphanum().min(8).max(200).required(),
  passwordConfirmation: Joi.ref('password'),
}).options({ convert: false });
