import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";

export const setupMongo = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  mongoose.connect(uri, {
    useNewUrlParser: true,
  } as ConnectOptions);

  return async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  };
};