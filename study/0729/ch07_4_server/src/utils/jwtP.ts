import {
  Jwt,
  JwtPayload,
  sign,
  SignOptions,
  verify,
  VerifyOptions,
} from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.REACT_APP_SECRET || "";

export const jwtSignP = (
  payload: string | Buffer | object,
  options: SignOptions = {}
) =>
  new Promise<string>((resolve, reject) => {
    try {
      const jwt = sign(payload, secret, options);

      resolve(jwt);
    } catch (error) {
      reject(error);
    }
  });

export const jwtVerifyP = (token: string, options: VerifyOptions = {}) =>
  new Promise<Jwt | JwtPayload | string>((resolve, reject) => {
    try {
      const decoded = verify(token, secret, options);

      resolve(decoded);
    } catch (error) {
      reject(error);
    }
  });
