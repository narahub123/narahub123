import {
  AuthMenu,
  EmailSignupModal,
  SignupModal,
  WidgetButton,
} from "./components";

function App() {
  return (
    <div className="App">
      <EmailSignupModal />
      <SignupModal />
      <AuthMenu />
      <WidgetButton />
    </div>
  );
}

export default App;
