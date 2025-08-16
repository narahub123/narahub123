import { useEffect, useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";
import { ChatroomDto, ChatroomUserInfo } from "../types";
import { useOpenStore } from "../stores";
import { fetchWithAuth } from "../utils";
import { useChatroomsStore } from "../stores/useChatroomsStore";
import ProfileImage from "./ProfileImage";
import { useUserStore } from "../stores/useUserStore";

interface UserInfo {
  username: string;
  profileImage: string;
}

const ChatroomCreateModal = () => {
  const [step, setStep] = useState(0);
  const [chatroom, setChatroom] = useState<ChatroomDto>({
    roomTitle: "",
    roomIntro: "",
    roomCapacity: 3,
    roomProfileImage: "",
    roomCoverImage: "",
    isSecret: false,
    roomPassword: null,
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    profileImage: "",
    username: "",
  });

  const user = useUserStore((state) => state.user);

  const isChatroomCreateModalOpen = useOpenStore(
    (state) => state.isChatroomCreateModalOpen
  );

  const setIsChatroomCreateModalOpen = useOpenStore(
    (state) => state.setIsChatroomCreateModalOpen
  );

  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  // 기본 값 입력
  useEffect(() => {
    if (!user || !isChatroomCreateModalOpen) return;

    setUserInfo({
      username: user.username,
      profileImage: user.profileImage,
    });
  }, [user, isChatroomCreateModalOpen]);

  const onClose = () => {
    setIsChatroomCreateModalOpen(false);
  };

  const handleChangeChatroomInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setChatroom((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setUserInfo((prev) => ({
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
        chatroom,
        userInfo,
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
        {step === 0 ? (
          <div className="space-y-4">
            <Input
              field="roomTitle"
              onChange={handleChangeChatroomInfo}
              placeholder="채팅방 이름을 작성해주세요."
              entity={chatroom}
            />
            <Input
              field="roomIntro"
              onChange={handleChangeChatroomInfo}
              placeholder="채팅방 소개글을 작성해주세요."
              entity={chatroom}
            />
            {/* input에 type이 number 인 경우 min max 설정 가능하게 수정할 것 */}
            <Input
              field="roomCapacity"
              onChange={handleChangeChatroomInfo}
              placeholder="입장 가능한 최대 인원을 설정해주세요.(최대 10명)"
              entity={chatroom}
              type={"number"}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <ProfileImage src={userInfo.profileImage} size={75} />
            </div>
            <Input
              field="username"
              entity={userInfo}
              placeholder="채팅방에서 사용할 이름을 입력해주세요."
              onChange={handleChangeUserInfo}
            />
          </div>
        )}
        <div className="">
          {step === 0 ? (
            <Button
              disabled={!chatroom.roomTitle}
              className="w-full btn btn-primary"
              onClick={() => setStep(1)}
            >
              다음
            </Button>
          ) : (
            <div className="flex justify-between">
              <Button
                disabled={!chatroom.roomTitle}
                className="btn btn-primary"
                onClick={() => setStep(0)}
              >
                이전
              </Button>
              <Button
                disabled={!chatroom.roomTitle}
                className="btn btn-primary"
                onClick={handleCreateChatroom}
              >
                채팅방 만들기
              </Button>
            </div>
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChatroomCreateModal;
