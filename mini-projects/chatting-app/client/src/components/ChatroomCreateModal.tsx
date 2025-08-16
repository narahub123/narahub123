import { useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";
import { ChatroomDto } from "../types";
import { useOpenStore } from "../stores";
import { fetchWithAuth } from "../utils";
import { useChatroomsStore } from "../stores/useChatroomsStore";

const ChatroomCreateModal = () => {
  const [chatroom, setChatroom] = useState<ChatroomDto>({
    roomTitle: "",
    roomIntro: "",
    roomCapacity: 3,
    roomProfileImage: "",
    roomCoverImage: "",
    isSecret: false,
    roomPassword: null,
  });

  const isChatroomCreateModalOpen = useOpenStore(
    (state) => state.isChatroomCreateModalOpen
  );

  const setIsChatroomCreateModalOpen = useOpenStore(
    (state) => state.setIsChatroomCreateModalOpen
  );

  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  const onClose = () => {
    setIsChatroomCreateModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setChatroom((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCreateChatroom = async () => {
    const response = await fetchWithAuth(
      "/chatrooms/group",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        ...chatroom,
      }
    );

    if (!response.success) {
      console.log("채팅방 생성 실패");
      return;
    }

    // 채팅방 모달 열기
    // 어떤 정보를 응답 받아야 하는지 생각해볼 것
    const roomId = response.data.roomId;

    setIsChatroomCreateModalOpen(false);

    addConnectedChatroom(roomId);
  };

  return (
    <Modal open={isChatroomCreateModalOpen}>
      <ModalContent
        className="space-y-4 max-w-[320px]"
        onCloseIconClicked={onClose}
      >
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">채팅방 만들기</h2>
        </div>
        <div className="space-y-4">
          <Input
            field="roomTitle"
            onChange={handleChange}
            placeholder="이름을 작성해주세요."
            entity={chatroom}
          />
          <Input
            field="roomIntro"
            onChange={handleChange}
            placeholder="채팅방 소개글을 작성해주세요."
            entity={chatroom}
          />
          {/* input에 type이 number 인 경우 min max 설정 가능하게 수정할 것 */}
          <Input
            field="roomCapacity"
            onChange={handleChange}
            placeholder="입장 가능한 최대 인원을 설정해주세요.(최대 10명)"
            entity={chatroom}
            type={"number"}
          />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!chatroom.roomTitle}
            className="w-full btn btn-primary"
            onClick={handleCreateChatroom}
          >
            채팅방 만들기
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChatroomCreateModal;
