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

function App() {
  useLoginCheck();
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
      <ChatroomModal />
    </div>
  );
}

export default App;
