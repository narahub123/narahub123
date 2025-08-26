import {
  AuthMenu,
  ChatModal,
  ChatroomCreateModal,
  ChatroomJoinModal,
  ChatroomModal,
  CheckPasswordModal,
  EmailSignupModal,
  LoginModal,
  OpenChatroomListModal,
  ResetPasswordModal,
  SendFilesModal,
  SignupModal,
  Toast,
  UserProfileModal,
  WidgetButton,
} from "./components";
import { useLoginCheck } from "./hooks";
import { useChatroomsStore } from "./stores/useChatroomsStore";

function App() {
  const connectedChatrooms = useChatroomsStore(
    (state) => state.connectedChatrooms
  );
  const deleteConnectedChatroom = useChatroomsStore(
    (state) => state.deleteConnectedChatroom
  );

  useLoginCheck();

  const onClose = (roomId: string) => {
    deleteConnectedChatroom(roomId);
  };

  return (
    <div className="App">
      <ChatModal />
      <EmailSignupModal />
      <SignupModal />
      <LoginModal />
      <AuthMenu />
      <WidgetButton />
      <ChatroomCreateModal />
      <OpenChatroomListModal />
      <UserProfileModal />
      <ResetPasswordModal />
      <CheckPasswordModal />
      <ChatroomJoinModal />
      {connectedChatrooms.map((connectedChatroom) => (
        <ChatroomModal
          roomId={connectedChatroom}
          onClose={onClose}
          key={connectedChatroom}
        />
      ))}
      <Toast />
    </div>
  );
}

export default App;
