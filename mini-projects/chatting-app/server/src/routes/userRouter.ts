import { Router } from "express";
import { joinChatroom, getUserInfo, getUserChatrooms } from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/me", authTokenVerifier, getUserInfo);
router.get("/me/chatrooms", authTokenVerifier, getUserChatrooms);
router.patch("/me/chatrooms/:roomid", authTokenVerifier, joinChatroom);

export default () => router;
