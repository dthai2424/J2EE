import React, { useState } from "react";
// Sử dụng lucide-react cho icons như đã chỉ định
import axiosClient from "../api/axiosClient";
import { AuthService } from "../api/AuthService";
// --- Thành phần Icon Social ---
// Một component nhỏ để giữ style nhất quán
const SocialIcon = ({ children, href = "#" }) => (
  <a
    href={href}
    className="social-icon h-10 w-10 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all"
  >
    {children}
  </a>
);

// --- Thành phần Input ---
const StyledInput = ({ type = "text", placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="bg-gray-100 border-none rounded-lg p-3 my-2 w-full focus:outline-none focus:ring-2 focus:ring-sky-400"
  />
);

// --- Thành phần Nút Bấm Chính ---
const ActionButton = ({ children, type = "submit" }) => (
  <button
    type={type}
    className="bg-sky-400 text-white font-bold uppercase rounded-full py-3 px-8 mt-4 transition-transform hover:scale-105 active:scale-95 shadow-md"
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
const handleSignupSubmit = async (e){
  e.preventDefault();
  try {
    await AuthService.register(username,Name,email,phone,password);
  } catch (err){
    
  }

}
// --- Thành phần Form Đăng ký ---
const SignUpForm = () => (
  <form
    action="#"
    onSubmit={handleSignupSubmit}
    className="flex flex-col items-center text-center h-full justify-center px-12"
  >
    <h1 className="text-3xl font-bold mb-2">Create Account</h1>

    <StyledInput type="text" placeholder="Name" />
    <StyledInput type="email" placeholder="Email" />
    <StyledInput type="phone" placeholder="Phone" />
    <StyledInput type="password" placeholder="Password" />
    <ActionButton>Sign Up</ActionButton>
  </form>
);

// --- Thành phần Form Đăng nhập ---
const SignInForm = () => (
  <form
    action="#"
    onSubmit={handleSigninSubmit}
    className="flex flex-col items-center text-center h-full justify-center px-12"
  >
    <h1 className="text-3xl font-bold mb-2">Sign In</h1>

    <span className="text-sm text-gray-500 mb-4">or use your account</span>
    <StyledInput type="email" placeholder="Email" />
    <StyledInput type="password" placeholder="Password" />
    <a href="#" className="text-sm text-gray-500 my-3 hover:underline">
      Forgot your password?
    </a>
    <ActionButton>Sign In</ActionButton>
  </form>
);

// --- Thành phần App chính ---
export function AuthPage() {
  // State để theo dõi xem panel "Sign Up" có đang hoạt động hay không
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
  };

  /*
      Giải thích logic class:
      Chúng ta sử dụng state `isSignUpActive` để tự động thêm/bớt các lớp Tailwind.
      - Khi `isSignUpActive` là true:
        1. Panel Đăng nhập (`sign-in-container`): trượt sang phải (`translate-x-full`), mờ đi (`opacity-0`)
        2. Panel Đăng ký (`sign-up-container`): trượt sang phải (`translate-x-full`), hiện ra (`opacity-100`), và hiện lên trên (`z-20`)
        3. Container Lớp phủ (`overlay-container`): trượt sang trái (`-translate-x-full`)
        4. Lớp phủ (`overlay`): trượt sang phải (`translate-x-1/2`) để lộ panel "Welcome Back"
      - Khi `isSignUpActive` là false (mặc định), tất cả các lớp transform được gỡ bỏ, trở về vị trí ban đầu.
    */

  return (
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
          <SignUpForm />
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
          <SignInForm />
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
                        ${isSignUpActive ? "-translate-x-1/2" : "translate-x-0"}
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
  );
}
