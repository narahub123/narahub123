import { Router } from "express";
import {
  createGroupChatroom,
  getChatroomInfo,
  getGroupChatrooms,
  leaveChatroom,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/group", authTokenVerifier, getGroupChatrooms);
router.get("/:roomid", authTokenVerifier, getChatroomInfo);
router.post("/group", authTokenVerifier, createGroupChatroom);
router.delete("/:roomid/leave", authTokenVerifier, leaveChatroom);

export default () => router;
