import { Router } from "express";
import {
  joinChatroom,
  getUserInfo,
  getUserChatrooms,
  updateMe,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";
import multer from "multer";

const upload = multer();

const router = Router();

router.get("/me", authTokenVerifier, getUserInfo);
router.patch("/me", authTokenVerifier, upload.single("profileImage"), updateMe);
router.get("/me/chatrooms", authTokenVerifier, getUserChatrooms);
router.patch("/me/chatrooms/:roomid", authTokenVerifier, joinChatroom);

export default () => router;
