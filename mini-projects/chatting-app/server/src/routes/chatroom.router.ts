import { Router } from "express";
import {
  checkReadMessages,
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
router.patch(
  "/:roomid/participants/me/read",
  authTokenVerifier,
  checkReadMessages
);
router.delete("/:roomid/leave", authTokenVerifier, leaveChatroom);

export default () => router;
