import {
  AuthMenu,
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
