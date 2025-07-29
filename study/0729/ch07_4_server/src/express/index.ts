import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { setupRouter } from "./setupRouters";

export const createExpressApp = (...args: any[]) => {
  const app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`url=${req.url}, method=${req.method}`);
    next();
  });

  app.use(express.static("public"));

  // 전달받은 데이터를 req.body 형태로 얻을 수 있도록 하는 미들웨어
  app.use(express.json());

  // 데이터를 보낼 때 프리플라이트 요청과 응답 통신 기능을 추가하여
  // 악의적인 목적으로 데이터를 서버 쪽에 보내지 못하게 하는 기술
  app.use(cors());

  return setupRouter(app, ...args);
};
