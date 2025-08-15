import { useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import Input from "./Input";
import { ChatroomDto } from "../types";

const ChatroomCreateModal = () => {
  const [chatroom, setChatroom] = useState<ChatroomDto>({
    name: "",
    intro: "",
    max: 3,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setChatroom((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <Modal open>
      <ModalContent className="space-y-4 max-w-[320px]">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">채팅방 만들기</h2>
        </div>
        <div className="space-y-4">
          <Input
            field="name"
            onChange={handleChange}
            placeholder="이름을 작성해주세요."
            entity={chatroom}
          />
          <Input
            field="intro"
            onChange={handleChange}
            placeholder="채팅방 소개글을 작성해주세요."
            entity={chatroom}
          />
          {/* input에 type이 number 인 경우 min max 설정 가능하게 수정할 것 */}
          <Input
            field="max"
            onChange={handleChange}
            placeholder="입장 가능한 최대 인원을 설정해주세요.(최대 10명)"
            entity={chatroom}
            type={"number"}
          />
        </div>
        <div className="flex justify-end">
          <Button disabled={!chatroom.name} className="w-full btn btn-primary">
            채팅방 만들기
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ChatroomCreateModal;
