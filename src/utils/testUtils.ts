import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";

let mongo: MongoMemoryServer | undefined;

export const setupMongo = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  mongoose.connect(uri, {
    useNewUrlParser: true,
  } as ConnectOptions);
};

export const dropMongo = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};
