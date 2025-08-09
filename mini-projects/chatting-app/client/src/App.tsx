import {
  AuthMenu,
  EmailSignupModal,
  LoginModal,
  ResetPasswordModal,
  SignupModal,
  WidgetButton,
} from "./components";

function App() {
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
