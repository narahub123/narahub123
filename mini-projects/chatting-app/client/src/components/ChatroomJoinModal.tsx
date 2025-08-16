import { FC, useEffect, useState } from "react";
import { useOpenStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useChatroomsStore } from "../stores/useChatroomsStore";
import { fetchWithAuth } from "../utils";
import Input from "./Input";
import { useUserStore } from "../stores/useUserStore";
import ProfileImage from "./ProfileImage";

interface UserInfo {
  username: string;
  profileImage: string;
}

const ChatroomJoinModal: FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "",
    profileImage: "",
  });

  const user = useUserStore((state) => state.user);

  const addChatroom = useUserStore((state) => state.addChatroom);

  const isChatroomJoinModalOpen = useOpenStore(
    (state) => state.isChatroomJoinModalOpen
  );

  const setIsChatroomJoinModalOpen = useOpenStore(
    (state) => state.setIsChatroomJoinModalOpen
  );

  const joinChatroomId = useChatroomsStore((state) => state.joinChatroom);

  const setJoinChatroom = useChatroomsStore((state) => state.setJoinChatroom);

  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );

  // 기본 값 입력
  useEffect(() => {
    if (!user || !isChatroomJoinModalOpen) return;

    setUserInfo({
      username: user.username,
      profileImage: user.profileImage,
    });
  }, [user, isChatroomJoinModalOpen]);

  const onClose = () => {
    // 입력 값 초기화
    setUserInfo({ username: "", profileImage: "" });
    // 가입할 채팅방 초기화
    setJoinChatroom("");
    // 채팅방 가입 모달 닫기
    setIsChatroomJoinModalOpen(false);
  };

  const joinChatroomWithRoomId = async () => {
    try {
      const response = await fetchWithAuth(
        `/users/me/chatrooms/${joinChatroomId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          username: userInfo.username,
          profileImage: userInfo.profileImage,
        }
      );

      if (!response.success) {
        console.error(response.code);
        console.error("오픈 채팅방 가입 실패");
        return;
      }

      // 사용자의 채팅방 기존 목록에 현재 채팅방을 추가
      addChatroom(joinChatroomId);

      // 초기화
      // 입력 값 초기화
      setUserInfo({ username: "", profileImage: "" });
      // 가입할 채팅방 초기화
      setJoinChatroom("");

      // 가입 모달 닫기
      setIsChatroomJoinModalOpen(false);

      // 해당 채팅방 열기
      addConnectedChatroom(joinChatroomId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Modal open={isChatroomJoinModalOpen}>
      <ModalContent onCloseIconClicked={onClose} className="space-y-4">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">채팅방 가입 모달</h2>
        </div>
        <div className="space-y-2">
          <div className="flex justify-center">
            <ProfileImage src={userInfo.profileImage} size={75} />
          </div>
          <Input
            field="username"
            entity={userInfo}
            placeholder="채팅방에서 사용할 이름을 입력해주세요."
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between">
          <Button onClick={onClose} className="text-white btn btn-error">
            취소
          </Button>
          <Button className="btn btn-primary" onClick={joinChatroomWithRoomId}>
            가입하기
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChatroomJoinModal;
