import { useEffect } from "react";
import { useLoginStore } from "../stores";
import { checkLoginState } from "../utils/localStorageUtils";
import { useUserStore } from "../stores/useUserStore";
import { useChatroomsStore } from "../stores/useChatroomsStore";

const useLoginCheck = () => {
  // 로그인 상태
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  // 로그인 상태 감지 변경
  const setIsLoggedIn = useLoginStore((state) => state.setIsLoggedIn);

  // 사용자 정보 초기화
  const clearUserInfo = useUserStore((state) => state.clearUserInfo);

  // 연결된 채팅방 지우기
  const clearConnectedChatrooms = useChatroomsStore(
    (state) => state.clearConnectedChatrooms
  );

  // 오픈 채팅방 목록 비우기
  const setOpenChatrooms = useChatroomsStore((state) => state.setOpenChatrooms);

  // 로그인 상태 확인
  useEffect(() => {
    const isLogggedIn = checkLoginState();

    setIsLoggedIn(isLogggedIn);

    if (!isLogggedIn) {
      // 사용자 정보 초기화
      clearUserInfo();
      // 채팅방 정보 초기화
      // 연결된 채팅방 초기화
      clearConnectedChatrooms();

      // 연결된 채팅방 연결 끊기

      // 오픈채팅방 목록 초기화
      setOpenChatrooms([]);

      // 여닫기 상태 초기화
    }
  }, [setIsLoggedIn, isLoggedIn]);
};

export default useLoginCheck;
