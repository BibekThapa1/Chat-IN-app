import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-green-100 m-0 h-screen overflow-hidden">
      <Outlet/>
    </div>
  );
}

export default App;
