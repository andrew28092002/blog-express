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

const userRouter = Router();

userRouter.get("/getAll", authMiddleware, postController.getPosts);
userRouter.get("/getOne", authMiddleware, postController.getOnePost);
userRouter.get("/getAll", authMiddleware, postController.getPosts);
userRouter.post("/create", upload.array('files', 5), authMiddleware, postController.createPost);
userRouter.post("/update", upload.array('files', 5), authMiddleware, postController.updatePost);
userRouter.delete("/delete", authMiddleware, postController.deletePost);

export { userRouter };
