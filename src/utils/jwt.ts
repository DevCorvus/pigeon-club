import type { Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import { JWT_SECRET } from '../config/env';

export const generateJwt = (id: number) => {
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return { token: signedToken };
};

export const verifyJwt = async (socket: Socket) => {
  const { token } = socket.handshake.auth;
  if (!token) return false;

  try {
    const userRepository = getRepository(User);

    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await userRepository.findOne(payload.sub, {
      select: ['id', 'nickname'],
    });
    if (!user) return false;

    socket.data.user = user;
    return true;
  } catch (err) {
    return false;
  }
};
