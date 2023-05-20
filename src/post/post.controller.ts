import { NextFunction, Request, Response } from "express";
import postService from "./post.service.js";

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

class PostController {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, searchQuery } = req.query;
      const data = await postService.getPosts(
        page as string,
        searchQuery as string
      );

      res.status(200).json(data);
    } catch (e) {
      next(e);
    }
  }

  async getOnePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await postService.getOnePost(id);

      res.status(200).json(post);
    } catch (e) {
      next(e);
    }
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const fields = { ...req.body };
      const files = (req.files as IFile[]).map(
        (file: IFile) => `/static/${file.originalname}`
      );
      fields.media = files;
      fields.author = req.cookies.userId
      
      const newPost = await postService.createPost(fields, req.cookies.userId);
      
      res.status(201).json(newPost);
    } catch (e) {
      console.log(e)
      next(e);
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      const fields = { ...req.body };
      const files = (req.files as IFile[]).map(
        (file: IFile) => `/static/${file.originalname}`
      );

      if (files.length) {
        fields.media = files;
      }
      
      const updatedPost = await postService.updatePost(req.params.id, fields, req.cookies.userId);
      
      res.status(200).json({updatedPost});
    } catch (e) {
      next(e);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      await postService.deletePost(req.params.id, req.cookies.userId);
      res.status(204).json({ message: "delete" });
    } catch (e) {
      next(e);
    }
  }
}

export default new PostController();
