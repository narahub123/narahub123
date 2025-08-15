import {
  AuthMenu,
  ChatModal,
  ChatroomCreateModal,
  ChatroomModal,
  EmailSignupModal,
  LoginModal,
  ResetPasswordModal,
  SignupModal,
  WidgetButton,
} from "./components";
import { useLoginCheck } from "./hooks";
import { useChatroomsStore } from "./stores/useChatroomsStore";

function App() {
  const openChatrooms = useChatroomsStore((state) => state.openChatrooms);
  const deleteOpenChatroom = useChatroomsStore(
    (state) => state.deleteOpenChatroom
  );

  useLoginCheck();

  const onClose = (roomId: string) => {
    deleteOpenChatroom(roomId);
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
      {openChatrooms.map((openChatroom) => (
        <ChatroomModal
          roomId={openChatroom}
          onClose={onClose}
          key={openChatroom}
        />
      ))}
    </div>
  );
}

export default App;
