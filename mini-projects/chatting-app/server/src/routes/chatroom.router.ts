import { Router } from "express";
import {
  createGroupChatroom,
  getChatroomInfo,
  getGroupChatrooms,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/group", authTokenVerifier, getGroupChatrooms);
router.get("/:roomid", authTokenVerifier, getChatroomInfo);
router.post("/group", authTokenVerifier, createGroupChatroom);

export default () => router;
