import {
  AuthMenu,
  ChatModal,
  Chatroom,
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
      <Chatroom />
      <ChatModal />
      <ResetPasswordModal />
      <EmailSignupModal />
      <SignupModal />
      <LoginModal />
      <AuthMenu />
      <WidgetButton />
    </div>
  );
}

export default App;
