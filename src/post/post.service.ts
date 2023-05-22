import { CreatePostDto } from "./dto/createPost.dto.ts";
import { UpdatePostDto } from "./dto/updatePost.dto.ts";
import postModel from "./entities/post.model.ts";
import { ApiError } from "../exceptions/api.error.ts";

class PostService {
  async getPosts(pageNumber = "1", searchQuery: string) {
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
          message: title,
        })
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

  async updatePost(id: string, fields: UpdatePostDto, userId: string) {
    const post = await postModel.findById(id);

    if (!post) {
      throw ApiError.NotFound("Post not found");
    }

    if (post.author !== userId) {
      throw ApiError.BadRequest("You are not author");
    }

    await postModel.findByIdAndUpdate(id, fields, {
      new: true,
    });

    return post;
  }

  async deletePost(id: string, userId: string) {
    const post = await postModel.findById(id);

    if (!post) {
      throw ApiError.NotFound("Post not found");
    }

    if (post.author !== userId) {
      throw ApiError.BadRequest("You are not author");
    }

    await postModel.findByIdAndDelete(id);

    return post;
  }
}

export default new PostService();
