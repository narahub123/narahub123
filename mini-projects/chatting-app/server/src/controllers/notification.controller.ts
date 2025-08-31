import { Request, Response } from "express";
import { asyncWrapper } from "../utils";
import { notificationService } from "../services";

// 알림 목록 조회
export const getNotificationList = asyncWrapper(
  "getNotificationList",
  async (req: Request, res: Response) => {
    const user = req.user;

    try {
      const notifications = await notificationService.getNotificationList(
        user.email
      );

      res.status(200).json({
        success: true,
        message: "알림 목록 조회 성공",
        code: "NOTIFICATION_LIST_SUCCEEDED",
        timestamp: new Date().toISOString(),
        data: {
          notifications,
        },
      });
    } catch (error) {
      throw error;
    }
  }
);

// 알림 조회
export const getNotification = asyncWrapper(
  "getNotification",
  async (req: Request, res: Response) => {
    const user = req.user;

    const { notificationId } = req.body;

    try {
      const notification = await notificationService.getNotificaitonById(
        notificationId
      );
    } catch (error) {
      throw error;
    }
  }
);

// 알림 생성
export const createNotification = asyncWrapper(
  "createNotification",
  async (req: Request, res: Response) => {}
);

// 알림 수정
export const updateNotification = asyncWrapper(
  "updateNotification",
  async (req: Request, res: Response) => {}
);

// 알림 삭제
export const deleteNotification = asyncWrapper(
  "deleteNotification",
  async (req: Request, res: Response) => {
    const user = req.user;
    const { notificationId } = req.params;

    await notificationService.deleteNotificationById(
      notificationId,
      user.email
    );

    res.status(200).json({
      success: true,
      message: "알림 삭제 성공",
      code: "NOTIFICATION_DELETION_SUCCEEDED",
      timestamp: new Date().toISOString(),
    });
  }
);

// 알림 전체 삭제
export const deleteNotificationAll = asyncWrapper(
  "deleteNotificationAll",
  async (req: Request, res: Response) => {
    const user = req.user;

    await notificationService.deleteAllNotifications(user.email);

    res.status(200).json({
      success: true,
      message: "알림 전체 삭제 성공",
      code: "ALL_NOTIFICATION_DELETION_SUCCEEDED",
      timestamp: new Date().toISOString(),
    });
  }
);
