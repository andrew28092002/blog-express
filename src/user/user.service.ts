import { CreateUserDto } from "./dto/createUser.dto.js";
import userModel from "./entities/user.model.js";

class UserService{
    async create(createUserDto: CreateUserDto) {
        const newUser = await userModel.create(createUserDto);
        return newUser;
      }
    
      async getAll() {
        const allUsers = await userModel.find();
    
        return allUsers;
      }
    
      async getOne(id: string) {
        const currentUser = await userModel.findById(id);
    
        return currentUser;
      }
    
      async findByUserEmail(email: string) {
        const currentUser = await userModel.findOne({ email });
    
        return currentUser;
      }
}

export default new UserService()