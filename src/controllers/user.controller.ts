import type { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { validatePassword, encryptPassword } from '../utils/password';
import { generateJwt } from '../utils/jwt';

const login = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user) return res.status(404).send('User not found');

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.status(401).send('Wrong password');

    res.json(generateJwt(user.id));
  } catch (err) {
    res.sendStatus(500);
  }
};

const register = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { nickname, username, password } = req.body;

  try {
    const user = new User();
    user.nickname = nickname;
    user.username = username;
    user.password = await encryptPassword(password);

    const newUser = await userRepository.save(user);

    res.status(201).json(generateJwt(newUser.id));
  } catch (err) {
    res.status(409).send('User already exist');
  }
};

export default {
  login,
  register,
};
