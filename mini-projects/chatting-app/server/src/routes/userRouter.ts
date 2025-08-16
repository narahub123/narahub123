import { Router } from "express";
import { joinChatroom, getUserInfo } from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/me", authTokenVerifier, getUserInfo);
router.patch("/me/chatrooms/:roomid", authTokenVerifier, joinChatroom);

export default () => router;
