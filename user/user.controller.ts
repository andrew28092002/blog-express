import userService from "./user.service.js";


class UserController{
    async findAll(){
        const users = await userService.findAll()

        return users
    }
}

export default new UserController()