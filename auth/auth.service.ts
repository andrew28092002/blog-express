import jwt from "jsonwebtoken";
import tokenModel from "./entities/token.model.js";
import { CreateUserDto } from "./dto/createUser.dto.js";
import { AuthUserDto } from "./dto/authUser.dto.js";

class AuthService {
  async signUp(createUserDto: CreateUserDto) {}

  hashData(data: string) {}

  async signIn(authUserDto: AuthUserDto) {}

  generateTokens(payload: { id: string; email: string }) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
      expiresIn: "10s",
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(userId: string) {}

  async refreshTokens(userId: string, refreshToken: string) {}

  validateAccessToken(accessToken: string) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(refreshToken: string) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET!
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
}

export default new AuthService();
