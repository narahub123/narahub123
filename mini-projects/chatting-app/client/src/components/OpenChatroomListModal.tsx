import { useEffect } from "react";
import { Modal, ModalContent } from "../theme/daisyui";
import { useChatroomsStore } from "../stores/useChatroomsStore";
import { fetchWithAuth } from "../utils";
import { useOpenStore } from "../stores";

const OpenChatroomListModal = () => {
  const openChatrooms = useChatroomsStore((state) => state.openChatrooms);
  const setOpenChatrooms = useChatroomsStore((state) => state.setOpenChatrooms);
  const addConnectedChatroom = useChatroomsStore(
    (state) => state.addConnectedChatroom
  );
  const isOpenChatroomModalOpen = useOpenStore(
    (state) => state.isOpenChatroomListModalOpen
  );

  const setIsOpenChatroomModalOpen = useOpenStore(
    (state) => state.setIsOpenChatroomListModalOpen
  );

  useEffect(() => {
    if (!isOpenChatroomModalOpen) return;

    const fetchChatroomsData = async () => {
      const response = await fetchWithAuth("/chatrooms/group");

      if (!response || !response.success) {
        console.log("오픈 채팅방 목록 조회 실패");
        return;
      }

      const openChatrooms = response.data.openChatrooms;

      setOpenChatrooms(openChatrooms);
    };

    fetchChatroomsData();
  }, [isOpenChatroomModalOpen]);

  const onClose = () => {
    setIsOpenChatroomModalOpen(false);
  };

  return (
    <Modal open={isOpenChatroomModalOpen}>
      <ModalContent onCloseIconClicked={onClose}>
        <div>
          <h2>오픈 채팅방 목록</h2>
        </div>
        <div>
          <ul className="">
            {openChatrooms.map((openChatroom) => (
              <li
                key={openChatroom.roomId}
                className="p-2 cursor-pointer"
                onClick={() => addConnectedChatroom(openChatroom.roomId)}
              >
                {openChatroom.roomId}
              </li>
            ))}
          </ul>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default OpenChatroomListModal;
