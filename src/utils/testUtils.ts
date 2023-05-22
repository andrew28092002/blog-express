import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";

let mongo: MongoMemoryServer | undefined;
export interface IMongoFunctions {
  dropMongo: () => void;
  dropCollections: () => void;
}

export const setupMongo = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  mongoose.connect(uri, {
    useNewUrlParser: true,
  } as ConnectOptions);

  return {
    dropMongo,
    dropCollections,
  };
};

const dropMongo = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

export const dropCollections = async () => {
  if (mongo) {
    console.log(mongo);
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};
