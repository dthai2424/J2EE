import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Landing } from "./pages/Landing.jsx";
import { AuthPage } from "./pages/AuthPage.jsx";
import { Navbar } from "./components/Navbar.jsx";
import { Footers } from "./components/Footers.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <div className="mt-15"></div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />}></Route>
      </Routes>
      <Footers />
    </>
  );
}

export default App;
