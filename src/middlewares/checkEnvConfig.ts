import { Request, Response, NextFunction } from 'express';

const validateEnvConfig = (): boolean => {
  const expectedVars = ['NODE_ENV', 'PORT', 'JWT_SECRET', 'DATABASE_URL'];
  const receivedVars = Object.keys(process.env);
  const matchingVars = receivedVars.filter((received) =>
    expectedVars.includes(received)
  );
  return matchingVars.length === expectedVars.length;
};

export function checkEnvConfig(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!validateEnvConfig())
    return res.status(500).send('Missing environment variables');
  next();
}
