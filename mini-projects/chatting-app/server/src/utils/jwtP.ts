import { JWT_SECRET_KEY } from "../constants";
import jwt from "jsonwebtoken";

export const jwtSignP = async (
  payload: string | Buffer | object,
  expiresIn: jwt.SignOptions["expiresIn"]
) => {
  try {
    const options: jwt.SignOptions = {
      algorithm: "HS256",
      expiresIn,
      issuer: "chappting-app",
    };

    return jwt.sign(payload, JWT_SECRET_KEY, options);
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      throw new Error("JWT 형식 오류");
    }
    if (err instanceof jwt.NotBeforeError) {
      throw new Error("아직 유효하지 않은 토큰");
    }
    if (err instanceof jwt.TokenExpiredError) {
      throw new Error("만료된 토큰");
    }

    throw err;
  }
};
