import { NextFunction, Request, Response } from "express";

export const asyncWrapper = (
  name: string,
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      // 에러가 발생하면 에러 메시지와 함께 함수 이름을 출력합니다.
      console.error(`${name}에서 에러 발생`, err);

      // 에러가 발생했을 때, 다음 미들웨어로 에러를 전달합니다.
      next({
        error: err,
      });
    }
  };
};
