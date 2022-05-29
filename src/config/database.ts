import type { ConnectionOptions } from "typeorm";
import { NODE_ENV, DATABASE_URL } from "./env";
import { User } from "../entity/user";
import { Message } from "../entity/message";

export const databaseConfig = (): ConnectionOptions => {
  if (NODE_ENV === "production") {
    return {
      type: "postgres",
      url: DATABASE_URL,
      synchronize: true,
      logging: false,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Message],
    };
  }

  // Default (Development)
  return {
    type: "sqlite",
    database: "test.sqlite",
    synchronize: true,
    logging: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
  };
};
