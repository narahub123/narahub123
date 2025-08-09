import {
  AuthMenu,
  EmailSignupModal,
  LoginModal,
  SignupModal,
  WidgetButton,
} from "./components";

function App() {
  return (
    <div className="App">
      <EmailSignupModal />
      <SignupModal />
      <LoginModal />
      <AuthMenu />
      <WidgetButton />
    </div>
  );
}

export default App;
