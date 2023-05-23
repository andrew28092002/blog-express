import supertest from "supertest";
import userModel from "../../user/entities/user.model.ts";
import { startApp } from "../../app.ts";
import { setupMongo } from "../../utils/testUtils.ts";

const app = startApp()
let dropMongo: () => void

describe("Testing user controller", () => {
  beforeAll(async () => {
    const dropMongo = await setupMongo()
  })

  beforeAll(() => {
    if (dropMongo){
      dropMongo()
    }
  })

  describe("GET user/", () => {
    test("should return a list of user", async () => {
      const res = await supertest(app).get("/user");

      expect(res.status).toBe(200);
    });
  });

  describe("GET user/{id}", () => {
    test("should return 404; user not found", async () => {
      await supertest(app).get(`/user/asdf`).expect(404);
    });

    test("should return 200; user exist", async () => {
      const user = await userModel.create({
        name: "ad",
        email: "adsf",
        password: "asdf",
      });
      const res = await supertest(app).get(`/user/${user.id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
    });
  });
});
