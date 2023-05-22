import supertest from "supertest";
import postModel from "../../post/entities/post.model.ts";
import { startApp } from "../../app.ts";
import { dropMongo, setupMongo } from "../../utils/testUtils.ts";

const app = startApp();

describe("Testing post controller", () => {
  beforeAll(() => {
    setupMongo();
  });

  beforeAll(() => {
    dropMongo();
  });

  describe("GET post/", () => {
    test("should return a list of post", async () => {
      const res = await supertest(app).get("/post");

      expect(res.status).toBe(200);
      expect(Object.keys(res.body)).toEqual(
        expect.arrayContaining(["posts", "currentPage", "countPages"])
      );
    }, 50000);
  });

  describe("GET post/{id}", () => {
    test("should return 404; post not found", async () => {
      await supertest(app).get(`/user/asdf`).expect(404);
    });

    test("should return 200; post exist", async () => {
      const post = await postModel.create({
        message: "ad",
        media: ["adsf"],
        author: "asdf",
      });
      const res = await supertest(app).get(`/post/${post.id}`);

      expect(res.status).toBe(200);
      expect(res.body.post).toHaveProperty("_id");
    }, 50000);
  });

  //   describe("DELETE post/{id}", () => {
  //     test("should return 404; post not found", async () => {
  //       await supertest(app).delete(`/post/asdf`).expect(404);
  //     });

  //     test("should return 200; post deleted", async () => {
  //       const post = await postModel.create({
  //         message: "ad",
  //         media: ["adsf"],
  //         author: "asdf",
  //       });
  //       const res = await supertest(app).delete(`/post/${post.id}`);

  //       expect(res.status).toBe(200)
  //       expect(res.body.message).toBe('delete')
  //     }, 50000);
  //   });
});
