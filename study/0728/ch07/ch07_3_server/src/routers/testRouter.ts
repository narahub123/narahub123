import { Request, Response, Router } from "express";

export const testRouter = (...args: any[]) => {
  const router = Router();

  return router
    .get("/", (req: Request, res: Response) => {
      // 모든 데이터를 요청하는 경우

      res.json({ ok: true });
    })
    .get("/:id", (req: Request, res: Response) => {
      const { id } = req.params;

      // id 값을 가진 데이터만 요청하는 경우

      res.json({ ok: true, id });
    })
    .post("/", (req: Request, res: Response) => {
      const { body } = req;

      // req.body의 데이터를 저장하기를 요청하는 경우
      res.json({ ok: true, body });

      res.json({ ok: true });
    })
    .put("/:id", (req: Request, res: Response) => {
      const { id } = req.params;
      const { body } = req;

      // id 값을 가진 데이터의 수정을 요청하는 경우

      res.json({ ok: true, body, id });
    })
    .delete("/:id", (req: Request, res: Response) => {
      const { id } = req.params;

      // id 값을 가진 데이터의 삭제을 요청하는 경우

      res.json({ ok: true, id });
    });
};
