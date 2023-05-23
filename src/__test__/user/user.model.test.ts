import { Error } from "mongoose";
import userModel from "../../user/entities/user.model.ts";
import { setupMongo } from "../../utils/testUtils.ts";

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
    const user = await userModel.create({
      email: "new_user_email@mail.ru",
      name: "newUser",
      password: "password",
    });

    expect(Object.keys(user.schema.obj)).toEqual(
      expect.arrayContaining(["name", "email", "password", "refreshToken"])
    );
  });

  test("should throw error without required fields", async () => {
    try {
      await userModel.create({});
    } catch (e) {
      expect(e).toBeInstanceOf(Error.ValidationError);
    }
  });

  test("should throw error with fields of wrong type", async () => {
    try {
      await userModel.create({
        name: 324234,
        email: "andre@gmail.com",
        password: "sdjfsdf",
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error.ValidationError);
    }
  });
});
