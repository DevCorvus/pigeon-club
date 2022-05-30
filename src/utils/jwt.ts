import { Socket } from 'socket.io';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { getEnv } from '../config/env';

import { userRepository } from './database';

export const generateJwt = (id: number) => {
  const { JWT_SECRET } = getEnv();

  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

  return { token: signedToken };
};

export const verifyJwt = async (socket: Socket) => {
  const { JWT_SECRET } = getEnv();

  const { token } = socket.handshake.auth;
  if (!token) return false;

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    const user = await userRepository.findOne({
      where: {
        id: Number(payload.sub),
      },
      select: {
        id: true,
        nickname: true,
      },
    });
    if (!user) return false;

    socket.data.user = user;
    return true;
  } catch (err) {
    return false;
  }
};
