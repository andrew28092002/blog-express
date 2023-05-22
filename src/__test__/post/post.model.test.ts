
import { Error } from "mongoose";
import postModel from "../../post/entities/post.model.ts";
import { dropCollections, dropMongo, setupMongo } from "../../utils/testUtils.ts";

describe("Testing user model", () => {
  beforeAll(async () => {
    setupMongo();
  });

  afterEach(() => {
    dropCollections();
  });

  afterAll(async () => {
    dropMongo();
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
