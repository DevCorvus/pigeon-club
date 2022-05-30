import { NextFunction, Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { Socket } from 'socket.io';

export const limitGlobalHttpRequestsPerIp = new RateLimiterMemory({
  keyPrefix: 'too_many_requests',
  points: 6,
  duration: 1,
});

export function rateLimiter(limiter: RateLimiterMemory) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch (_) {
      res.sendStatus(429);
    }
  };
}

const chatRequestsLimiter = new RateLimiterMemory({
  keyPrefix: 'too_many_requests',
  points: 5,
  duration: 3,
  blockDuration: 10,
});

export function limitChatRequestsPerIp(socket: Socket) {
  socket.use(async (event, next) => {
    try {
      if (event[0] !== 'message:typing') {
        const ip = socket.conn.remoteAddress;
        await chatRequestsLimiter.consume(ip);
      }
      next();
    } catch (_) {
      socket.emit('notification', {
        type: 'error',
        msg: 'Too many requests >.(cooldown of 10 seconds)',
      });
    }
  });
}
