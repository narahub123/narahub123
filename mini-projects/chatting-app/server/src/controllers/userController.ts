import { Request, Response } from "express";
import { asyncWrapper } from "../utils";
import { chatroomService, userService } from "../services";
import { ChatroomUserInfo } from "../types";

export const getUserInfo = asyncWrapper(
  "getUserInfo",
  async (req: Request, res: Response) => {
    console.log(req.user);
    const { password, ...rest } = req.user;

    const userInfo = rest;

    res.status(200).json({
      success: true,
      message: "사용자 정보 조회 성공",
      code: "USER_INFO_RETRIEVAL_SUCCEEDED",
      timestamp: new Date().toISOString(),
      data: {
        user: userInfo,
      },
    });
  }
);

// 채팅방 가입하기
export const joinChatroom = asyncWrapper(
  "joinChatroom",
  async (req: Request, res: Response) => {
    const user = req.user;
    const { roomid } = req.params;
    const { username, profileImage } = req.body;

    const userInfo: ChatroomUserInfo = {
      email: user.email,
      username,
      profileImage,
      joinedAt: new Date(),
      lastEnteredAt: new Date(),
    };

    // 채팅방에 사용자 정보 추가
    await chatroomService.joinChatroom(roomid, userInfo);
    // 사용자 chatroom 추가
    await userService.updateUserChatrooms(user.email, roomid);

    res.status(200).json({
      success: true,
      message: "채팅방 가입 성공",
      code: "JOIN_CHATROOM_SUCCEEDED",
      timestamp: new Date().toISOString(),
    });
  }
);
