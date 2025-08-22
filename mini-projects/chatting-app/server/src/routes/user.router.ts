import { Router } from "express";
import {
  joinChatroom,
  getUserInfo,
  getUserChatrooms,
  updateMe,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/me", authTokenVerifier, getUserInfo);
router.patch("/me", authTokenVerifier, updateMe);
router.get("/me/chatrooms", authTokenVerifier, getUserChatrooms);
router.patch("/me/chatrooms/:roomid", authTokenVerifier, joinChatroom);

export default () => router;
