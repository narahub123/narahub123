import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET_KEY } from "../constants";
dotenv.config();

export const createToken = (
  user: any,
  expiresIn: jwt.SignOptions["expiresIn"]
) => {
  const payload = {
    id: user.userId,
    email: user.email,
  };

  const secretKey = JWT_SECRET_KEY;

  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn,
    issuer: "chatting-app",
  };

  return jwt.sign(payload, secretKey, options);
};
