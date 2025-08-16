import {
  AuthMenu,
  ChatModal,
  ChatroomCreateModal,
  ChatroomModal,
  EmailSignupModal,
  LoginModal,
  OpenChatroomListModal,
  ResetPasswordModal,
  SignupModal,
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
      <ResetPasswordModal />
      <EmailSignupModal />
      <SignupModal />
      <LoginModal />
      <AuthMenu />
      <WidgetButton />
      <ChatroomCreateModal />
      <OpenChatroomListModal />
      {connectedChatrooms.map((connectedChatroom) => (
        <ChatroomModal
          roomId={connectedChatroom}
          onClose={onClose}
          key={connectedChatroom}
        />
      ))}
    </div>
  );
}

export default App;
