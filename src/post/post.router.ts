import { Request, Router } from "express";
import postController from "./post.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import commonjsVariables from 'commonjs-variables-for-esmodules';

const {
  __dirname,
  require
} = commonjsVariables(import.meta);

const multer  = require('multer')
const upload = multer({ dest: 'static/' })

const postRouter = Router();

postRouter.get("/", authMiddleware, postController.getPosts);
postRouter.get("/:id", authMiddleware, postController.getOnePost);
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
