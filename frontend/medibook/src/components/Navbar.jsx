import logo from "../assets/logo_new.png";
import { Button } from "./Button.jsx";
import { Dropdown } from "./Dropdown.jsx";
import { useNavigate } from "react-router-dom";

// 1. Import useAuth từ Context
import { useAuth } from "../context/AuthContext.jsx";

export function Navbar() {
  const navigate = useNavigate();

  // 2. Lấy state và hàm từ AuthContext
  const { user, logout } = useAuth();

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout(); // Xóa state và sessionStorage
    navigate("/"); // Chuyển về trang chủ
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white pl-10 pr-10 pt-2 pb-2 border-b-1 z-[100]">
      <div className="flex h-20 items-center gap-10 text-xl font-semibold ">
        <div
          className="flex items-center gap-5 cursor-pointer"
          onClick={() => goTo("/")}
        >
          <img src={logo} className=" h-20 w-30" alt="Logo" />
          <p className="text-[#00B5F1] text-3xl">MediBook</p>
        </div>
        <p>&nbsp;</p>

        {/* Navigation Links (Giữ nguyên) */}
        <p
          className="hover:text-[#00B5F1] cursor-pointer"
          onClick={() => goTo("/")}
        >
          Trang chủ
        </p>
        <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
          <p>Cơ sở y tế </p>
          <span className="text-2xl">&#9662;</span>
        </div>
        <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
          <p>Dịch vụ y tế</p>
          <span className="text-2xl">&#9662;</span>
        </div>
        <div className="relative">
          <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
            <p>Chuyên khoa</p>
            <span className="text-2xl">&#9662;</span>
          </div>
          {/* <Dropdown /> */}
        </div>
        <p className="hover:text-[#00B5F1] cursor-pointer">Bác sĩ</p>

        {/* 3. Tách phần trống ra (Spacer) */}
        <div className="flex-grow"></div>

        {/* 4. Hiển thị có điều kiện (Conditional Rendering) */}
        {user ? (
          // ĐÃ ĐĂNG NHẬP
          <div className="flex items-center gap-5">
            <span
              className="text-lg font-medium text-gray-700 cursor-pointer hover:text-[#00B5F1] transition-colors"
              onClick={() => goTo("/profile")} // <--- Thêm sự kiện chuyển trang
            >
              Chào, {user.name}!
            </span>
            <div onClick={handleLogout}>
              <Button color="bg-red-500" textColor="text-white">
                Đăng xuất
              </Button>
            </div>
          </div>
        ) : (
          // CHƯA ĐĂNG NHẬT
          <div className="flex items-center gap-5">
            <div onClick={() => goTo("/auth")}>
              <Button
                color="bg-[#00B5F1]"
                id="signupButton"
                textColor="text-white"
              >
                Tài khoản
              </Button>
            </div>
            <div onClick={() => goTo("/auth")}>
              <Button
                color="bg-[#FFB340]"
                id="signinButton"
                textColor="text-white"
              >
                Đặt khám
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
