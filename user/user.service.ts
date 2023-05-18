import { CreateUserDto } from "./dto/createUser.dto.js";
import userModel from "./entities/user.model.js";

class UserService{
    async create(createUserDto: CreateUserDto) {
        const newUser = await userModel.create(createUserDto);
        return newUser;
      }
    
      async findAll() {
        const allUsers = await userModel.find();
    
        return allUsers;
      }
    
      async findOne(id: string) {
        const currentUser = await userModel.findById(id);
    
        return currentUser;
      }
    
      async findByUserEmail(email: string) {
        const currentUser = await userModel.findOne({ email });
    
        return currentUser;
      }
    
      async remove(id: string) {
        const deletedUser = await userModel.findByIdAndDelete(id, {
          new: true,
        });
    
        return deletedUser!.id;
      }
}

export default new UserService()