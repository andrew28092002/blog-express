
import { Error } from "mongoose";
import postModel from "../../post/entities/post.model.ts";
import { setupMongo } from "../../utils/testUtils.ts";
import userModel from "../../user/entities/user.model.ts";

let dropMongo: () => void;

describe("Testing user model", () => {
  beforeAll(async () => {
    dropMongo = await setupMongo();
  });

  afterEach(async () => {
    await userModel.deleteMany();
  });

  afterAll(async () => {
    if (dropMongo) {
      dropMongo();
    }
  });

  test("should create a new user", async () => {
    const post = await postModel.create({
      message: "newPost",
      media: ["photo1", "photo2"],
      author: '_id'
    });

    expect(Object.keys(post.schema.obj)).toEqual(
      expect.arrayContaining(["message", "media", "author", "createdAt"])
    );
  });

  test("should throw error without required fields", async () => {
    try {
      await postModel.create({});
    } catch (e) {
      expect(e).toBeInstanceOf(Error.ValidationError)
    }

  });

  test("should throw error with fields of wrong type", async () => {
    try {
      await postModel.create({
        message: 23232,
        media: ["photo1", "photo2"],
        author: '_id'
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error.ValidationError)
    }
  });
});
