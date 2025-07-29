import { Request, Response, Router } from "express";
import { MongoDB } from "../mongodb";
import { ObjectId } from "mongodb";
import { getUserIdFromJwtP } from "./getUserIdFromJwtP";

export const testRouter = (...args: any[]) => {
  const db: MongoDB = args[0];

  const test = db.collection("test");

  const router = Router();

  return router
    .get("/", async (req: Request, res: Response) => {
      try {
        // 모든 데이터를 요청하는 경우
        const userId = await getUserIdFromJwtP(req);

        console.log(userId);
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
        const userId = await getUserIdFromJwtP(req);
        const findResult = await test.findOne({ _id: new ObjectId(id) });

        res.json({ ok: true, body: findResult });
      } catch (e) {
        if (e instanceof Error)
          res.json({ ok: false, errorMessage: e.message });
      }
    })
    .post("/", async (req: Request, res: Response) => {
      const { body } = req;
      try {
        // try {
        //   await test.drop();
        // } catch (error) {
        //   // 오류 무시
        // }

        // req.body의 데이터를 저장하기를 요청하는 경우
        const userId = await getUserIdFromJwtP(req);

        const insertResult = await test.insertOne({ ...body });

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

      console.log(id, body);

      try {
        // id 값을 가진 데이터의 수정을 요청하는 경우
        const userId = await getUserIdFromJwtP(req);

        const updateResult = await test.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: body },
          { returnDocument: "after" }
        );

        res.json({ ok: true, body: updateResult && updateResult });
      } catch (e) {
        if (e instanceof Error) {
          res.json({ ok: false, errorMessage: e.message });
        }
      }
    })
    .delete("/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      console.log(id);

      try {
        // id 값을 가진 데이터의 삭제을 요청하는 경우
        const userId = await getUserIdFromJwtP(req);

        await test.deleteOne({ _id: new ObjectId(id) });

        // await test.findOneAndDelete({ id });

        res.json({ ok: true, id });
      } catch (e) {
        if (e instanceof Error) {
          res.json({ ok: false, errorMessage: e.message });
        }
      }
    });
};
