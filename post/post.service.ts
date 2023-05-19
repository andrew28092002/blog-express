import mongoose from "mongoose";
import { CreatePostDto } from "./dto/createPost.dto.js";
import { UpdatePostDto } from "./dto/updatePost.dto.js";
import postModel from "./entities/post.model.js";
import { ApiError } from "../exceptions/api.error.js";

class PostService {
  async getPosts(pageNumber='1', searchQuery: string) {
    const LIMIT = 20;
    const startIndex = (Number(pageNumber) - 1) * LIMIT;
    const title = new RegExp(searchQuery, "i");
    let posts, total;

    if (searchQuery) {
      total = await postModel.countDocuments({
        $or: [{ title }],
      });

      posts = await postModel
        .find({
          $or: [{ title }],
        })
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);
    } else {
      total = await postModel.countDocuments({});

      posts = await postModel.find().limit(LIMIT).skip(startIndex);
    }
    
    return {
      posts,
      currentPage: Number(pageNumber),
      countPages: Math.ceil(total / LIMIT),
    };
  }

  async getOnePost(id: string) {
    const post = await postModel.findById(id);

    return {
      post,
    };
  }

  async createPost(fields: CreatePostDto, userId: string) {
    const newPost = await postModel.create({ ...fields });
    newPost.save();

    return newPost;
  }

  async updatePost(id: string, fields: UpdatePostDto) {
    
    const updatedPost = await postModel.findByIdAndUpdate(id, fields, {
      new: true,
    });
    
    return updatedPost;
  }

  async deletePost(id: string) {
    const deletedPost = await postModel.findByIdAndDelete(id, {
      new: true,
    });

    return deletedPost
  }
}

export default new PostService();
