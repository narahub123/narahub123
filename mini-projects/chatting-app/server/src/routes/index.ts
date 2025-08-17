import { Router } from "express";
import authRouter from "./authRouter";
import userRouter from "./userRouter";
import chatroomRouter from "./chatroomRouter";
import notificationRouter from "./notificationRouter";

const router = Router();

router.use("/auth", authRouter());
router.use("/users", userRouter());
router.use("/chatrooms", chatroomRouter());
router.use("/notifications", notificationRouter());

export default () => router;
