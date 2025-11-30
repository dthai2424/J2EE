import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../api/AuthService";
import { ErrorAlert } from "../components/ErrorAlert";
import { useAuth } from "../context/AuthContext"; // 1. Import AuthContext

// ... (Giữ nguyên các component con ControlledInput, ActionButton, GhostButton, SignUpForm, SignInForm)
const ControlledInput = (props) => (
  <input
    {...props}
    className="bg-gray-100 border-none rounded-lg p-3 my-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
  />
);

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

const GhostButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="ghost bg-transparent border border-white text-white font-bold uppercase rounded-full py-3 px-8 transition-transform hover:scale-105 active:scale-95"
  >
    {children}
  </button>
);

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
// ... (Kết thúc phần component con)

export function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Lấy hàm login từ Context

  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [registerData, setRegisterData] = useState({
    username: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState("");

  const [globalMessage, setGlobalMessage] = useState({
    message: null,
    type: "error",
  });

  // Regex Validation
  const USERNAME_REGEX = /^[a-zA-Z0-9._-]+$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
  const PHONE_REGEX = /^\+?[1-9][0-9]{7,14}$/;
  const PASSWORD_REGEX =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;

  // ... (Giữ nguyên Handlers Change)
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

  // Hàm đóng thông báo và điều hướng
  const handleCloseGlobalAlert = () => {
    if (globalMessage.type === "success") {
      // Nếu đăng ký thành công -> Chuyển sang tab Đăng nhập
      if (isSignUpActive) {
        setIsSignUpActive(false);
      } else {
        // Mặc định về trang chủ nếu đóng thông báo thủ công (có thể sửa nếu muốn)
        navigate("/");
      }
    }
    setGlobalMessage({ message: null });
  };

  // --- Validation ---
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
    return null;
  };

  // --- XỬ LÝ ĐĂNG NHẬP (ĐÃ CẬP NHẬT LOGIC ADMIN) ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setGlobalMessage({ message: null });

    try {
      const response = await AuthService.login(
        loginData.username,
        loginData.password
      );

      // 1. Cập nhật AuthContext ngay lập tức để lưu Token & User
      login(response.data.accessToken, response.data.user);

      console.log("Login Successful:", response.data);
      setGlobalMessage({
        message: `Đăng nhập thành công! Chào mừng ${response.data.user.name}.`,
        type: "success",
      });

      // 2. Kiểm tra Role để điều hướng
      const userRole = response.data.user.role;
      console.log(userRole);
      // Delay 1s để người dùng thấy thông báo rồi chuyển trang
      setTimeout(() => {
        if (userRole == "Admin") {
          // Nếu là Admin -> Chuyển đến trang AdminLayout
          navigate("/admin/clinics");
        } else {
          // Nếu là User thường hoặc Bác sĩ -> Về trang chủ
          navigate("/");
        }
      }, 3000);
    } catch (err) {
      let errorMessage =
        "Đăng nhập thất bại. Vui lòng kiểm tra Username và Password.";
      if (err.response && err.response.data) {
        errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : err.response.data.message || JSON.stringify(err.response.data);
      }
      console.error("Login Error:", errorMessage, err.response);
      setLoginError(errorMessage);
      setGlobalMessage({ message: errorMessage, type: "error" });
    }
  };

  // --- XỬ LÝ ĐĂNG KÝ ---
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    setGlobalMessage({ message: null });

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
      await AuthService.register(
        registerData.username,
        registerData.name,
        registerData.email,
        registerData.phoneNumber,
        registerData.password
      );

      console.log("Registration Successful");

      // Clear form
      setRegisterData({
        username: "",
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
      });

      setGlobalMessage({
        message: "Đăng ký thành công! Vui lòng đăng nhập.",
        type: "success",
      });

      // Chuyển sang tab Đăng nhập sau 2s
      setTimeout(() => {
        setIsSignUpActive(false);
      }, 2000);
    } catch (err) {
      let errorMessage = "Đăng ký thất bại do lỗi không xác định.";
      if (err.response && err.response.data) {
        // Backend thường trả về object lỗi hoặc string
        errorMessage =
          typeof err.response.data === "string"
            ? err.response.data
            : JSON.stringify(err.response.data);
      }
      console.error("Register Error:", errorMessage, err.response);
      setRegisterError(errorMessage);
      setGlobalMessage({ message: errorMessage, type: "error" });
    }
  };

  // --- UI Transitions ---
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
    <>
      <ErrorAlert
        message={globalMessage.message}
        onClose={handleCloseGlobalAlert}
        type={globalMessage.type}
      />

      <div className="bg-gray-100 flex items-center justify-center min-h-screen w-screen p-4 font-['Inter',_sans-serif]">
        {/* Container chính */}
        <div className="bg-white rounded-2xl shadow-2xl relative overflow-hidden w-full max-w-4xl min-h-[600px] h-3xl">
          {/* Panel Đăng ký */}
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

          {/* Panel Đăng nhập */}
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

          {/* Lớp phủ (Overlay) */}
          <div
            className={`
                      overlay-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden z-50 
                      transition-transform duration-700 ease-in-out
                      ${isSignUpActive ? "-translate-x-full" : "translate-x-0"}
                  `}
          >
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
              {/* Panel trái (cho Đăng nhập) */}
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

              {/* Panel phải (cho Đăng ký) */}
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
