import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  deleteNotificationAll,
  getNotification,
  getNotificationList,
  updateNotification,
} from "../controllers";
import { authTokenVerifier } from "../middlewares";

const router = Router();
// 알림 목록 조회
router.get("/", authTokenVerifier, getNotificationList);
// 알림 전체 삭제
router.delete("/", authTokenVerifier, deleteNotificationAll);
// 알림 조회
router.get("/:notificationid", authTokenVerifier, getNotification);
// 알림 수정
router.patch("/:notificationid", authTokenVerifier, updateNotification);
// 알림 삭제
router.delete("/:notificationid", authTokenVerifier, deleteNotification);

export default () => router;
