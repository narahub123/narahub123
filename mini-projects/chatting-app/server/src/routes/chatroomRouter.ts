import { Router } from "express";
import { createGroupChatroom, getGroupChatrooms } from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.get("/group", authTokenVerifier, getGroupChatrooms);
router.post("/group", authTokenVerifier, createGroupChatroom);

export default () => router;
