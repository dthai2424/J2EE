// File: frontend/medibook/src/pages/AuthPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../api/AuthService";
import { ErrorAlert } from "../components/ErrorAlert"; // THÊM IMPORT

// --- Thành phần Input có kiểm soát (Sử dụng cho cả Login/Register) ---
const ControlledInput = (props) => (
  <input
    {...props}
    className="bg-gray-100 border-none rounded-lg p-3 my-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
  />
);

// --- Thành phần Nút Bấm Chính ---
const ActionButton = ({ children, type = "submit", disabled = false }) => (
  <button
    type={type}
    disabled={disabled}
    className={`
      ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-sky-400 hover:scale-105 active:scale-95"
      } 
      text-white font-bold uppercase rounded-full py-3 px-8 mt-4 transition-transform shadow-md
    `}
  >
    {children}
  </button>
);

// --- Thành phần Nút Bấm "Ghost" (cho Lớp phủ) ---
const GhostButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="ghost bg-transparent border border-white text-white font-bold uppercase rounded-full py-3 px-8 transition-transform hover:scale-105 active:scale-95"
  >
    {children}
  </button>
);

// --- Thành phần Form Đăng ký (Nhận Props) ---
const SignUpForm = ({
  registerData,
  handleRegisterChange,
  handleRegisterSubmit,
  error,
}) => (
  <form
    onSubmit={handleRegisterSubmit}
    className="flex flex-col items-center text-center h-full justify-center px-12"
  >
    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
    {/* Hiển thị lỗi local */}
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

    <ControlledInput
      type="text"
      placeholder="Username (a-z, 0-9, ., _, -)"
      name="username"
      value={registerData.username}
      onChange={handleRegisterChange}
    />
    <ControlledInput
      type="text"
      placeholder="Name"
      name="name"
      value={registerData.name}
      onChange={handleRegisterChange}
    />
    <ControlledInput
      type="email"
      placeholder="Email"
      name="email"
      value={registerData.email}
      onChange={handleRegisterChange}
    />
    <ControlledInput
      type="text"
      placeholder="Phone Number (+84...)"
      name="phoneNumber"
      value={registerData.phoneNumber}
      onChange={handleRegisterChange}
    />
    <ControlledInput
      type="password"
      placeholder="Password (Min 8, A-z, 0-9, special)"
      name="password"
      value={registerData.password}
      onChange={handleRegisterChange}
    />
    <ActionButton>Sign Up</ActionButton>
  </form>
);

// --- Thành phần Form Đăng nhập (Nhận Props) ---
const SignInForm = ({
  loginData,
  handleLoginChange,
  handleLoginSubmit,
  error,
}) => (
  <form
    onSubmit={handleLoginSubmit}
    className="flex flex-col items-center text-center h-full justify-center px-12"
  >
    <h1 className="text-3xl font-bold mb-2">Sign In</h1>
    {/* Hiển thị lỗi local */}
    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

    <span className="text-sm text-gray-500 mb-4">or use your account</span>

    <ControlledInput
      type="text"
      placeholder="Username"
      name="username"
      value={loginData.username}
      onChange={handleLoginChange}
    />
    <ControlledInput
      type="password"
      placeholder="Password"
      name="password"
      value={loginData.password}
      onChange={handleLoginChange}
    />
    <a href="#" className="text-sm text-gray-500 my-3 hover:underline">
      Forgot your password?
    </a>
    <ActionButton>Sign In</ActionButton>
  </form>
);

// --- Thành phần App chính ---
export function AuthPage() {
  const navigate = useNavigate();

  // --- 1. UI State: Trạng thái chuyển đổi form ---
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  // --- 2. Data State: Dữ liệu và lỗi Đăng nhập (Login) ---
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState(""); // Lỗi hiển thị trong form

  // --- 3. Data State: Dữ liệu và lỗi Đăng ký (Register) ---
  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(""); // Lỗi hiển thị trong form

  // --- 4. Global State: Thông báo pop-up ---
  const [globalMessage, setGlobalMessage] = useState({
    message: null,
    type: "error",
  });

  // Regex kiểm tra bên Client-side (dựa trên UserUtil.java)
  //
  const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
  const PHONE_REGEX = /^\+?[1-9][0-9]{7,14}$/;
  // Ít nhất 8 ký tự, 1 số, 1 thường, 1 hoa, 1 ký tự đặc biệt (@#$%^&+=)
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
  // Name validation: Phức tạp với Unicode, dùng kiểm tra cơ bản và dựa vào Backend
  const NAME_BASIC_REGEX = /^[a-zA-Z\s.'-]+$/;
  // (Lưu ý: Để hỗ trợ tiếng Việt, cần regex phức tạp hơn hoặc flag /u trong môi trường hỗ trợ)

  // --- Handlers Clear/Change ---
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginError("");
    setGlobalMessage({ message: null });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterError("");
    setGlobalMessage({ message: null });
  };

  const handleCloseGlobalAlert = () => {
    setGlobalMessage({ message: null });
  };

  // --- Logic Client-side Validation (Đăng ký) ---
  const validateRegister = () => {
    const { username, name, email, phoneNumber, password } = registerData;
    if (!username || !name || !email || !phoneNumber || !password) {
      return "Vui lòng điền đầy đủ tất cả các trường.";
    }
    if (!USERNAME_REGEX.test(username)) {
      return "Username không hợp lệ. Chỉ cho phép chữ, số, dấu chấm, gạch dưới, gạch ngang.";
    }
    if (name.length < 3) {
      return "Tên phải có ít nhất 3 ký tự.";
    }
    if (!EMAIL_REGEX.test(email)) {
      return "Email không đúng định dạng.";
    }
    if (!PHONE_REGEX.test(phoneNumber)) {
      return "Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (VD: +84912345678).";
    }
    if (!PASSWORD_REGEX.test(password)) {
      return "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số, và ký tự đặc biệt.";
    }
    return null; // Không có lỗi
  };

  // --- Logic Submit API ---

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setGlobalMessage({ message: null });

    try {
      const response = await AuthService.login(
        loginData.username,
        loginData.password
      );

      console.log("Login Successful:", response.data);
      setGlobalMessage({
        message: `Đăng nhập thành công! Chào mừng ${response.data.name}.`,
        type: "success",
      });

      // Chờ pop-up hiển thị rồi chuyển hướng
      setTimeout(() => navigate("/"), 500);
    } catch (err) {
      let errorMessage =
        "Đăng nhập thất bại. Vui lòng kiểm tra Username và Password.";

      if (err.response && err.response.data) {
        errorMessage = err.response.data; // Lấy lỗi từ Backend
      }

      console.error("Login Error:", errorMessage, err.response);
      setLoginError(errorMessage); // Lỗi local (dưới form)
      setGlobalMessage({ message: errorMessage, type: "error" }); // Lỗi Global (Pop-up)
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setGlobalMessage({ message: null });
    const { username, name, email, phoneNumber, password } = registerData;

    const validationError = validateRegister();
    if (validationError) {
      setRegisterError(validationError);
      setGlobalMessage({
        message: "Vui lòng sửa các lỗi trong form Đăng ký.",
        type: "error",
      });
      return;
    }

    try {
      await AuthService.register(username, name, email, phoneNumber, password);

      console.log("Registration Successful");
      setGlobalMessage({
        message: "Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.",
        type: "success",
      });

      // Chuyển về form đăng nhập sau khi đăng ký thành công
      handleSignInClick();
    } catch (err) {
      let errorMessage = "Đăng ký thất bại do lỗi không xác định.";

      if (err.response && err.response.data) {
        errorMessage = err.response.data; // Lấy lỗi Conflict/Bad Request từ Backend
      }

      console.error("Register Error:", errorMessage, err.response);
      setRegisterError(errorMessage); // Lỗi local
      setGlobalMessage({ message: errorMessage, type: "error" }); // Lỗi Global (Pop-up)
    }
  };

  // --- Logic chuyển đổi UI ---
  const handleSignUpClick = () => {
    setIsSignUpActive(true);
    setLoginError("");
    setRegisterError("");
    setGlobalMessage({ message: null });
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setLoginError("");
    setRegisterError("");
    setGlobalMessage({ message: null });
  };

  return (
    // Component ErrorAlert được đặt ở cấp cao nhất để hiển thị pop-up
    <>
      <ErrorAlert
        message={globalMessage.message}
        onClose={handleCloseGlobalAlert}
        type={globalMessage.type}
      />

      <div className="bg-gray-100 flex items-center justify-center min-h-screen w-screen p-4 font-['Inter',_sans-serif]">
        {/* Container chính */}
        <div className="bg-white rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[600px] h-3xl">
          {/* Panel Đăng ký (Create Account) */}
          <div
            className={`
                      sign-up-container absolute top-0 left-0 w-1/2 h-full 
                      transition-all duration-700 ease-in-out
                      ${
                        isSignUpActive
                          ? "translate-x-full opacity-100 z-20"
                          : "translate-x-0 opacity-0 z-10 pointer-events-none"
                      }
                  `}
          >
            <SignUpForm
              registerData={registerData}
              handleRegisterChange={handleRegisterChange}
              handleRegisterSubmit={handleRegisterSubmit}
              error={registerError}
            />
          </div>

          {/* Panel Đăng nhập (Sign In) */}
          <div
            className={`
                      sign-in-container absolute top-0 left-0 w-1/2 h-full 
                      transition-all duration-700 ease-in-out
                      ${
                        isSignUpActive
                          ? "translate-x-full opacity-0 z-10 pointer-events-none"
                          : "translate-x-0 opacity-100 z-20"
                      }
                  `}
          >
            <SignInForm
              loginData={loginData}
              handleLoginChange={handleLoginChange}
              handleLoginSubmit={handleLoginSubmit}
              error={loginError}
            />
          </div>

          {/* Lớp phủ (Overlay) Container */}
          <div
            className={`
                      overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50 
                      transition-transform duration-700 ease-in-out
                      ${isSignUpActive ? "-translate-x-full" : "translate-x-0"}
                  `}
          >
            {/* Lớp phủ bên trong (phần màu xanh) */}
            <div
              className={`
                          overlay relative bg-gradient-to-r from-sky-400 to-sky-500 text-white 
                          h-full w-[200%] transition-transform duration-700 ease-in-out
                          ${
                            isSignUpActive
                              ? "-translate-x-1/2"
                              : "translate-x-0"
                          }
                      `}
            >
              {/* Panel bên trái của lớp phủ (Hiển thị khi Đăng nhập) */}
              <div
                className={`
                              overlay-left-panel absolute top-0 left-0 w-1/2 h-full 
                              flex flex-col items-center justify-center text-center p-10 
                              transition-transform duration-700 ease-in-out
                          `}
              >
                <h1 className="text-3xl font-bold mb-2">Hello, Friend!</h1>
                <p className="text-sm mb-4">
                  Enter your personal details and start your journey with us
                </p>
                <GhostButton onClick={handleSignUpClick}>Sign Up</GhostButton>
              </div>

              {/* Panel bên phải của lớp phủ (Hiển thị khi Đăng ký) */}
              <div
                className={`
                              overlay-right-panel absolute top-0 left-1/2 w-1/2 h-full 
                              flex flex-col items-center justify-center text-center p-10 
                              transition-transform duration-700 ease-in-out
                          `}
              >
                <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                <p className="text-sm mb-4">
                  To keep connected with us please login with your personal info
                </p>
                <GhostButton onClick={handleSignInClick}>Sign In</GhostButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
