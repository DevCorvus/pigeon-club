export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: parseInt(process.env.PORT as string),
    JWT_SECRET: process.env.JWT_SECRET as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
  };
}
