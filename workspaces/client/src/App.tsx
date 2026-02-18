import { LoginStateProvider } from "./provider/LoginStateProvider";
import "./App.css";
import { Router } from "./Router";

function App() {

  return (
    <LoginStateProvider>
      <Router/>
    </LoginStateProvider>
  );
}

export default App;
