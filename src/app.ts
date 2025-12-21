import express, { type Express } from "express";
import { Server } from "http";
import { userRouter } from "@/router";

import errorMiddleware from "@/middleware/error.middleware";
import { protect } from "@/middleware/auth.middleware";
import RedisCache from "@/library/redis";
import cookieParser from "cookie-parser";
import { routeWdVersion } from "@/library/utils";
import Constant from "./constant";
import helmet from "helmet";
import cors from "cors";
import express_loggerMiddleware from "./middleware/express_logger.middleware";

export default class App {
  private static _instance: App;
  readonly app: Express;
  private _listener!: Server;

  private constructor() {
    this.app = express();
    this.initialize();
  }

  get listener(): Server {
    return this._listener;
  }

  static get instance(): App {
    if (App._instance != null) return App._instance;
    this._instance = new App();
    return App._instance;
  }

  initialize() {
    this.intializeMiddleware();
    this.initializeRouter();
  }

  private intializeMiddleware() {

    // Set security HTTP headers
    this.app.use(helmet());

    this.app.use(cors())
    /* MIDDLEWARE:CORS */
    // this.app.options('*', corsPolicy);
    // this.app.use(corsPolicy);

    /* MIDDLEWARE:COOKIE-PARSER */
    this.app.use(cookieParser());

    /* MIDDLEWARE:EXPRESS_LOGGER */
    if (Constant.server.nodeEnv !== 'test') this.app.use(express_loggerMiddleware);

    /* MIDDLEWARE:BODY_PARSER */
    this.app.use(express.json());

    /* MIDDLEWARE:MAX_SIZE */
    this.app.use(express.json({ limit: "256kb" }));

    /* MIDDLEWARE:STATIC_FILES */
    this.app.use("/static", express.static("public"));

    /* MIDDLEWARE:PARSE_FORM-DATA */
    this.app.use(express.urlencoded({ extended: true, limit: "256kb" }));
  }

  private initializeRouter() {
    this.app.route(routeWdVersion("/")).get(async (_, res) => {
      res.redirect("/static/welcome/index.html");
    });

    /* ROUTE:PING */
    this.app.route(routeWdVersion("ping")).get(async (_, res) => {
      res.status(200).json({ ping: "Pong 😄" });
    });

    /* ROUTE:CLEAR-CACHE */
    this.app.route(routeWdVersion("clear-cache")).get(async (_, res) => {
      const clearCache = await RedisCache.client.flushAll();
      res.status(200).json({ message: "Success :)", clearCache });
    });

    this.app.use(routeWdVersion("user"), userRouter)

    /* MIDDLEWARE:PROTECT - CHECK_JWT_TOKEN */
    this.app.use(protect);

    /* MIDDLEWARE: ERROR */
    this.app.use(errorMiddleware);

    /* MIDDLEWARE:NOT_FOUND */
    // this.app.get("*", function (req, res) {
    //   res.status(404).json({
    //     status: "fail",
    //     message: `Ohh you are lost, can't find route ${req.url} - read the API documentation to find your way back home :)`,
    //   });
    // });
  }
}
