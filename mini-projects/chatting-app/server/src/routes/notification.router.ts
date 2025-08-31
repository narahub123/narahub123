import { Router } from "express";
import {
  createNotification,
  deleteNotification,
  deleteNotificationAll,
  getNotification,
  getNotificationList,
  updateNotification,
} from "../controllers";

const router = Router();
// 알림 목록 조회
router.get("/", getNotificationList);
// 알림 전체 삭제
router.delete("/", deleteNotificationAll);
// 알림 조회
router.get("/:notificationid", getNotification);
// 알림 수정
router.patch("/:notificationid", updateNotification);
// 알림 삭제
router.delete("/:notificationid", deleteNotification);

export default () => router;
