import supertest from "supertest";
import { startApp } from "../../app.ts";
import { IMongoFunctions, dropCollections, setupMongo } from "../../utils/testUtils.ts";

const app = startApp();
let mongo: IMongoFunctions

describe("auth", () => {
  beforeAll(async () => {
    mongo = await setupMongo();
  });

  afterEach(async () => {
    if (mongo){
      mongo.dropCollections()
    }
  })

  beforeAll(async () => {
    if (mongo){
      mongo.dropMongo()
    }
  });
  describe("POST auth/signup", () => {
    test("should return tokens", async () => {
      const res = await supertest(app).post("/auth/signup").send({
        name: "test",
        email: "email@gmail.com",
        password: "123123",
        confirmedPassword: "123123",
      });

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["accessToken", "refreshToken"])
      );
    });

    test("should throw error when password dismatch", async () => {
      const res = await supertest(app).post("/auth/signup").send({
        name: "test",
        email: "email@gmail.com",
        password: "123123",
        confirmedPassword: "123123fdf",
      });

      expect(res.status).toBe(400);
    });

    test("should throw error if user already exists", async () => {
      await supertest(app).post("/auth/signup").send({
        name: "test",
        email: "email@gmail.com",
        password: "123123",
        confirmedPassword: "123123",
      });

      const res = await supertest(app).post("/auth/signup").send({
        name: "test",
        email: "email@gmail.com",
        password: "123123",
        confirmedPassword: "123123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toBe("User already exist");
    });
  });

  // describe("POST auth/singin", () => {
  //   test("should return tokens", async () => {
  //     const res = await supertest(app).post("/auth/signin").send({
  //       email: "email@gmail.com",
  //       password: "123123",
  //     });

  //     expect(res.status).toBe(200);
  //     expect(Object.keys(res.body)).toEqual(
  //       expect.arrayContaining(["accessToken", "refreshToken"])
  //     );
  //   });

  //   test("should return incorrect password error", async () => {
  //     const res = await supertest(app).post("/auth/signin").send({
  //       email: "email@gmail.com",
  //       password: "12312asdfds3",
  //     });

  //     expect(res.status).toBe(400);
  //   });

  //   test("should return not found error", async () => {
  //     const res = await supertest(app).post("/auth/signin").send({
  //       email: "emaasdfsdfil@gmail.com",
  //       password: "123123",
  //     });

  //     expect(res.status).toBe(200);
  //     expect(Object.keys(res.body)).toEqual(
  //       expect.arrayContaining(["accessToken", "refreshToken"])
  //     );
  //   });
  // });

  // describe("GET auth/refresh", () => {
  //   test("", async () => {});
  // });

  // describe("POST auth/logout", () => {
  //   test("", async () => {});
  // });
});
