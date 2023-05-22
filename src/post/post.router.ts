import { Router } from "express";
import postController from "./post.controller.ts";
import { authMiddleware } from "../middleware/auth.middleware.ts";
import multer from 'multer';
const upload = multer({ dest: 'static/' })

const postRouter = Router();

postRouter.get("/", postController.getPosts);
postRouter.get("/:id", postController.getOnePost);
postRouter.post(
  "/",
  authMiddleware,
  upload.array('media', 5),
  postController.createPost
);
postRouter.put(
  "/:id",
  authMiddleware,
  upload.array('media', 5),
  postController.updatePost
);
postRouter.delete("/:id", authMiddleware, postController.deletePost);

export { postRouter };
