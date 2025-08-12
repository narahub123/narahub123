import { IUser } from "dtos";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
      sessionId: string;
    }
  }
}

export {};
