import { Request, Response } from 'express';

import { User } from '../entity/User';
import { userRepository } from '../utils/database';

import { validatePassword, encryptPassword } from '../utils/password';
import { generateJwt } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ username });
    if (!user) return res.status(404).send('User not found');

    const validPassword = await validatePassword(password, user.password);
    if (!validPassword) return res.status(401).send('Wrong password');

    res.json(generateJwt(user.id));
  } catch (err) {
    res.sendStatus(500);
  }
};

export const register = async (req: Request, res: Response) => {
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
