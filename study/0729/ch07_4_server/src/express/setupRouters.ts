import { Express } from "express";
import * as R from "../routers";

export const setupRouter = (app: Express, ...args: any[]): Express => {
  return app
    .use("/test", R.testRouter(...args))
    .use("/auth", R.authRouter(...args));
};
