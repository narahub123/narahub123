import { JWT_SECRET_KEY } from "../constants";
import jwt, {
  JsonWebTokenError,
  JwtPayload,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";

// jwtOptions
const jwtOptions = (
  expiresIn: jwt.SignOptions["expiresIn"]
): jwt.SignOptions => ({
  algorithm: "HS256",
  expiresIn,
  issuer: "chappting-app",
});

// jwt 생성
export const jwtSignP = async (
  payload: string | Buffer | object,
  expiresIn: jwt.SignOptions["expiresIn"]
) => {
  try {
    return jwt.sign(payload, JWT_SECRET_KEY, jwtOptions(expiresIn));
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new Error("JWT 형식 오류");
    }
    if (err instanceof NotBeforeError) {
      throw new Error("아직 유효하지 않은 토큰");
    }
    if (err instanceof TokenExpiredError) {
      throw new Error("만료된 토큰");
    }

    throw err;
  }
};

export const jwtVerifyP = async (token: string) => {
  const secret = process.env.JWT_SECRET_KEY as string;

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      throw new Error("JWT 형식 오류");
    }
    if (err instanceof NotBeforeError) {
      throw new Error("아직 유효하지 않은 토큰");
    }
    if (err instanceof TokenExpiredError) {
      throw new Error("만료된 토큰");
    }

    throw err;
  }
};
