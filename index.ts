import express, { Express } from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";

dotenv.config();

const app: Express = express();
app.use(json());
// app.use(cors())
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
