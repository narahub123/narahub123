import { Request, Response } from "express";
import { asyncWrapper } from "../utils";
import { ChatroomCreateType } from "../types";
import { chatroomService, userService } from "../services";
import { FieldValue } from "firebase-admin/firestore";

// 그룹 채팅방 생성하기
export const createGroupChatroom = asyncWrapper(
  "createGroupChatroom",
  async (req: Request, res: Response) => {
    const user = req.user;
    console.log(req.body);

    const {
      roomTitle,
      roomIntro,
      roomCapacity,
      roomProfileImage,
      roomCoverImage,
      isSecret,
      roomPassword,
    } = req.body;

    // dto로 유효성 검사 할 것

    const roomInfo: ChatroomCreateType = {
      roomTitle,
      roomIntro,
      roomCapacity,
      roomProfileImage,
      roomCoverImage,
      creator: user.userId,
      participants: [user.userId],
      roomType: "group",
      isSecret,
      roomPassword,
      createdAt: FieldValue.serverTimestamp(),
    };

    // chatroom 생성 및 roomId 가져오기
    const roomId = await chatroomService.createChatroom(roomInfo);

    // 사용자의 chatrooms에 roomId 추가
    await userService.updateUserChatrooms(user.email, roomId);

    res.status(201).json({
      success: true,
      message: "채팅방 생성 성공",
      code: "CHATROOM_CREATION_SUCCEEDED",
      timestamp: new Date().toISOString(),
      data: {
        roomId,
      },
    });
  }
);

// 그룹 채팅방 목록 불러오기
export const getGroupChatrooms = asyncWrapper(
  "getGroupChatrooms",
  async (req: Request, res: Response) => {
    const openChatrooms = await chatroomService.getGroupChatrooms();

    res.status(200).json({
      success: true,
      message: "오픈 채팅방 조회 성공",
      code: "OPEN_CHATROOMS_SUCCEEDED",
      timestamp: new Date().toISOString(),
      data: {
        openChatrooms,
      },
    });
  }
);
