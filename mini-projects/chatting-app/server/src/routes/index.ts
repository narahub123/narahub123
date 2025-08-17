import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import chatroomRouter from "./chatroom.router";
import notificationRouter from "./notification.router";

const router = Router();

router.use("/auth", authRouter());
router.use("/users", userRouter());
router.use("/chatrooms", chatroomRouter());
router.use("/notifications", notificationRouter());

export default () => router;
