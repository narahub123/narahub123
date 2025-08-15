import { Router } from "express";
import { createGroupChatroom } from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();

router.post("/group", authTokenVerifier, createGroupChatroom);

export default () => router;
