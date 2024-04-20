import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LeftContainer from "./components/leftContainer/LeftContainer";
import RightContainer from "./components/rightContainer/RightContainer";
import Home from "./pages/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-green-100 m-0 h-screen overflow-hidden">
      <Home/>
    </div>
  );
}

export default App;
