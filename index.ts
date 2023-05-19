import express, { Express, Request } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./auth/auth.router.js";
import { userRouter } from "./user/user.router.js";
import { postRouter } from "./post/post.router.js";

dotenv.config();

export interface CustomRequest<T> extends Request {
  body: T;
}

const app: Express = express();
app.use(json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use('/post', postRouter)

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    } as ConnectOptions);

    app.listen(PORT, () => console.log("SERVER HAS STARTED ON PORT: " + PORT));
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

startServer();
