import { Types } from "mongoose";
import { ApiError } from "../exceptions/api.error.ts";
import { CreateUserDto } from "./dto/createUser.dto.ts";
import userModel from "./entities/user.model.ts";

class UserService {
  async create(createUserDto: CreateUserDto) {
    const newUser = await userModel.create(createUserDto);
    return newUser;
  }

  async getAll() {
    const allUsers = await userModel.find();

    return allUsers;
  }

  async getOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw ApiError.NotFound("Not valid ID");
    }

    const currentUser = await userModel.findById(id);

    if (!currentUser) {
      throw ApiError.NotFound("User not found");
    }

    return currentUser;
  }

  async findByUserEmail(email: string) {
    const currentUser = await userModel.findOne({ email });

    return currentUser;
  }

  async delete(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw ApiError.NotFound("Not valid ID");
    }

     await userModel.findByIdAndDelete(id);

    return;
  }
}

export default new UserService();
