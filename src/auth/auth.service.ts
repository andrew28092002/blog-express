import jwt from "jsonwebtoken";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { AuthUserDto } from "./dto/authUser.dto.js";
import userModel from "../user/entities/user.model.js";
import bcrypt from "bcryptjs";
import userService from "../user/user.service.js";
import { ApiError } from "../exceptions/api.error.js";

interface JwtPayload {
  id: string;
  email: string;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async signUp(createUserDto: CreateUserDto) {
    const existingUser = await userService.findByUserEmail(createUserDto.email);

    if (existingUser) {
      throw ApiError.BadRequest("User already exist");
    }

    if (createUserDto.confirmedPassword !== createUserDto.password) {
      throw ApiError.BadRequest("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const newUser = await userModel.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    });

    const tokens = this.generateTokens({
      email: newUser.email,
      id: newUser.id,
    });

    newUser.refreshToken = tokens.refreshToken;

    await newUser.save();

    return tokens;
  }

  async signIn(authUserDto: AuthUserDto) {
    const existingUser = await userService.findByUserEmail(authUserDto.email);

    if (!existingUser) {
      throw ApiError.NotFound("User not found");
    }

    const isTruePassword = await bcrypt.compare(
      authUserDto.password,
      existingUser.password
    );

    if (!isTruePassword) {
      throw ApiError.BadRequest("Incorrect Password");
    }

    const tokens = this.generateTokens({
      email: existingUser.email,
      id: existingUser.id,
    });

    existingUser.refreshToken = tokens.refreshToken;

    await existingUser.save();

    return tokens;
  }

  generateTokens(payload: JwtPayload): ITokens {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(token: string): Promise<undefined> {
    const data = this.validateRefreshToken(token) as JwtPayload;

    const userFromDB = await userModel.findById(data.id);

    userFromDB!.refreshToken = "";
    userFromDB!.save();

    return;
  }

  async refreshTokens(token: string) {
    const data = this.validateRefreshToken(token) as JwtPayload;

    const userFromDB = await userModel.findById(data.id);

    const newTokens = this.generateTokens({
      email: userFromDB!.email,
      id: userFromDB!.id,
    });

    userFromDB!.refreshToken = newTokens.refreshToken;
    await userFromDB!.save();

    return newTokens;
  }

  validateAccessToken(accessToken: string) {
    const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);

    return userData;
  }

  validateRefreshToken(refreshToken: string) {
    const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    return userData;
  }
}

export default new AuthService();
