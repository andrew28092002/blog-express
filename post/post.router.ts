import { Request, Router } from "express";
import postController from "./post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import multer, { FileFilterCallback } from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({storage: storage});

const postRouter = Router();

postRouter.get("/getAll", authMiddleware, postController.getPosts);
postRouter.get("/getOne", authMiddleware, postController.getOnePost);
postRouter.get("/getAll", authMiddleware, postController.getPosts);
postRouter.post("/create", upload.array('files', 5), authMiddleware, postController.createPost);
postRouter.post("/update", upload.array('files', 5), authMiddleware, postController.updatePost);
postRouter.delete("/delete", authMiddleware, postController.deletePost);

export { postRouter };
