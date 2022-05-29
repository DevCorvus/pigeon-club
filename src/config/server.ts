import type { Connection as TypeOrmConnection } from "typeorm";
import { join as pathJoin } from "path";
import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "../routes/api";
import indexRoutes from "../routes/index";
import socketAPI from "../socketAPI";
import { checkEnvConfig } from "../middlewares/checkEnvConfig";
import { redirectOverHttps } from "../middlewares/redirectOverHttps";
import { NODE_ENV, PORT } from "./env";

export default function initializeExpressSocketServer(
  connection: TypeOrmConnection
) {
  console.log("Connected to database:", connection.driver.database);

  // Init
  const app = express();
  const server = http.createServer(app);
  const io = new WebSocketServer(server);

  // Settings
  app.set("port", Number(PORT));

  // Middlewares
  app.use(helmet());
  app.use(express.json());

  if (NODE_ENV === "production") {
    app.enable("trust proxy");
    app.use(redirectOverHttps);
    app.use(express.static(pathJoin(__dirname, "../../client/build")));
    app.use(checkEnvConfig);
  } else if (NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // Routes
  app.use("/api", apiRoutes);
  app.use(indexRoutes);
  socketAPI(io);

  // Run
  server.listen(app.get("port"), (): void => {
    console.log("Server on port", app.get("port"));
  });
}
