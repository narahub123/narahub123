import { Router } from "express";
import authRouter from "./authRouter";
import chatRouter from "./chatRouter";
import classroomRouter from "./classroomRouter";
import notificationRouter from "./notificationRouter";
import userRouter from "./userRouter";

const router = Router();

export default (): Router => {
  authRouter(router);
  chatRouter(router);
  classroomRouter(router);
  notificationRouter(router);
  userRouter(router);
  return router;
};
