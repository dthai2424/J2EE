import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Menu } from "./components/Menu.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="relative">
        <Menu />

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
