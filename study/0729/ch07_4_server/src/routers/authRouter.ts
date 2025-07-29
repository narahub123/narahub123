import { Request, Response, Router } from "express";
import { MongoDB } from "../mongodb";
import * as U from "../utils";

export const authRouter = (...args: any[]) => {
  const db: MongoDB = args[0];

  const user = db.collection("user");

  const router = Router();

  return router.post("/signup", async (req: Request, res: Response) => {
    const { body } = req;

    try {
      const exists = await user.findOne({ email: body.email });

      if (exists) {
        res.json({ ok: false, errorMessage: "이미 가입한 회원입니다." });
      } else {
        const { email, password } = body;

        const hashed = U.hashPasswordP(password);

        const newBody = { email, password: hashed };

        const { insertedId } = await user.insertOne(newBody);

        const jwt = await U.jwtSignP({ userId: insertedId });

        res.json({ ok: true, body: jwt });
      }
    } catch (e) {
      if (e instanceof Error) res.json({ ok: false, errorMessage: e.message });
    }
  });
};
