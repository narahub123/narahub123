import "./App.css";
import { Card, Navbar } from "./components";
import { ButtonContainer, CardContainer, CardWrapper, Login } from "./pages";

function App() {
  return (
    <div className="flex flex-col justify-center p-4">
      <CardWrapper />
      <ButtonContainer />
      <CardContainer />
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
