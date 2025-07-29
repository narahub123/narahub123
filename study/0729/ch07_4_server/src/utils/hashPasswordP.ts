import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRound = Number(process.env.REACT_APP_SALT);

export const hashPasswordP = (passoword: string) =>
  new Promise<string>(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(saltRound);
      const hash = await bcrypt.hash(passoword, salt);

      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });

export const comparePasswordP = (password: string, hashedPassword: string) =>
  new Promise<boolean>(async (resolve, reject) => {
    try {
      const result = bcrypt.compare(password, hashedPassword);

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
