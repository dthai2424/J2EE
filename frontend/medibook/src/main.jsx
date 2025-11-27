import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// 1. Import AuthProvider từ file context
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* 2. Bọc AuthProvider quanh <App />.
        Thao tác này đảm bảo <App /> và TẤT CẢ các component con của nó 
        (bao gồm cả Navbar) đều có thể truy cập state đăng nhập.
      */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
