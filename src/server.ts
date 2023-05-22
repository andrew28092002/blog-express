import { startApp, startMongo } from "./app.ts";

const PORT = process.env.PORT;

const app = startApp();

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    startMongo();
    console.log("SERVER HAS STARTED ON PORT: " + PORT);
  });
}
