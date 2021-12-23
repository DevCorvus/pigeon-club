export const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  DATABASE_URL,
} = process.env as {
  NODE_ENV: string;
  PORT: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
};