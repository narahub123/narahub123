import { Request, Response, Router } from "express";
import { MongoDB } from "../mongodb";

export const testRouter = (...args: any[]) => {
  const db: MongoDB = args[0];

  const test = db.collection("test");

  const router = Router();

  return router
    .get("/", async (req: Request, res: Response) => {
      try {
        // 모든 데이터를 요청하는 경우
        const findResult = await test.find({}).toArray();

        res.json({ ok: true, body: findResult });
      } catch (e) {
        if (e instanceof Error)
          res.json({ ok: false, errorMessage: e.message });
      }
    })
    .get("/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        // id 값을 가진 데이터만 요청하는 경우
        const findResult = await test.findOne({ id });

        res.json({ ok: true, body: findResult });
      } catch (e) {
        if (e instanceof Error)
          res.json({ ok: false, errorMessage: e.message });
      }
    })
    .post("/", async (req: Request, res: Response) => {
      const { body } = req;
      try {
        try {
          await test.drop();
        } catch (error) {
          // 오류 무시
        }

        // req.body의 데이터를 저장하기를 요청하는 경우
        const insertResult = await test.insertOne({ id: "1234", ...body });

        const { insertedId } = insertResult;

        const findResult = await test.findOne({ _id: insertedId });

        res.json({ ok: true, body: findResult });
      } catch (e) {
        if (e instanceof Error) {
          res.json({ ok: false, errorMessage: e.message });
        }
      }
    })
    .put("/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      const { body } = req;

      try {
        // id 값을 가진 데이터의 수정을 요청하는 경우
        const updateResult = await test.findOneAndUpdate(
          { id },
          { $set: body },
          { returnDocument: "after" }
        );

        return res.json({ ok: true, body: updateResult && updateResult });
      } catch (e) {
        if (e instanceof Error) {
          res.json({ ok: false, errorMessage: e.message });
        }
      }

      res.json({ ok: true, body, id });
    })
    .delete("/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        // id 값을 가진 데이터의 삭제을 요청하는 경우
        await test.deleteOne({ id });

        // await test.findOneAndDelete({ id });

        res.json({ ok: true });
      } catch (e) {
        if (e instanceof Error) {
          res.json({ ok: false, errorMessage: e.message });
        }
      }

      res.json({ ok: true, id });
    });
};
