import express, { Express, Request } from "express";
import dotenv from "dotenv";
import pkg from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./auth/auth.router.ts";
import { userRouter } from "./user/user.router.ts";
import { postRouter } from "./post/post.router.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { setupMongo } from "./utils/testUtils.ts";

const { json } = pkg;

dotenv.config();

export interface CustomRequest<T> extends Request {
  body: T;
}

const MONGO_URL = process.env.CONNECTION_URL!;

export const startMongo = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      setupMongo();
    } else {
      await mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
    }
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

export const startApp = () => {
  const app = express();
  app.use(json());
  app.use(cookieParser());
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(errorMiddleware);

  return app
};
