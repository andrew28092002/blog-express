import supertest from "supertest";
import { startApp } from "../../app.ts";
import { setupMongo } from "../../utils/testUtils.ts";
import authController from "../../auth/auth.controller.ts";
import userModel from "../../user/entities/user.model.ts";
import authService from "../../auth/auth.service.ts";

const userPayload = {
  name: "test",
  email: "email@gmail.com",
  password: "123123",
  confirmedPassword: "123123",
};

const app = startApp();
let dropMongo: () => void;

describe("auth", () => {
  beforeAll(async () => {
    dropMongo = await setupMongo();
  });

  afterAll(async () => {
    if (dropMongo) {
      dropMongo();
    }
  });

  describe("POST auth/signup", () => {
    test("should create new user andreturn tokens", async () => {
      const res = await supertest(app).post("/auth/signup").send(userPayload);

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["accessToken", "refreshToken"])
      );
    });

    test("should throw error when password dismatch", async () => {
      const res = await supertest(app)
        .post("/auth/signup")
        .send({
          ...userPayload,
          confirmedPassword: "123424234",
        });

      expect(res.status).toBe(400);
    });

    test("should throw error if user already exists", async () => {
      const res = await supertest(app).post("/auth/signup").send(userPayload);

      expect(res.status).toBe(400);
    });
  });

  describe("POST auth/singin", () => {
    test("should return tokens", async () => {
      const res = await supertest(app).post("/auth/signin").send({
        email: userPayload.email,
        password: userPayload.password,
      });

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["accessToken", "refreshToken"])
      );
    });

    test("should return incorrect password error", async () => {
      const res = await supertest(app).post("/auth/signin").send({
        email: userPayload.email,
        password: "12312asdfds3",
      });

      expect(res.status).toBe(400);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["message"])
      );
    });

    test("should return not found error", async () => {
      const res = await supertest(app).post("/auth/signin").send({
        email: "emaasdfsdfil@gmail.com",
        password: "123123",
      });

      expect(res.status).toBe(404);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["message"])
      );
    });
  });

  describe("GET auth/refresh", () => {
    test("should return tokens", async () => {
      const refreshToken = "existing-refresh-token";
      const newTokens = {
        accessToken: "new-access-token",
        refreshToken: "new-refresh-token",
      };

      const refreshAuthServiceMock = jest
        .spyOn(authService, "refreshTokens")
        .mockResolvedValueOnce(newTokens);

      const response = await supertest(app)
        .get("/auth/refresh")
        .set("Cookie", [`refreshToken=${refreshToken}`]);
        
      expect(response.status).toBe(200);
      expect(response.body).toEqual(newTokens);
      expect(refreshAuthServiceMock).toHaveBeenCalledWith(refreshToken);
    });
  });

  // describe("POST auth/logout", () => {
  //   test("", async () => {});
  // });
});
