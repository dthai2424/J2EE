import logo from "../assets/logo_new.png";
import { Button } from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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

        {/* Navigation Links */}
        <p
          className="hover:text-[#00B5F1] cursor-pointer"
          onClick={() => goTo("/")}
        >
          Trang chủ
        </p>
        <div
          className="flex items-center hover:text-[#00B5F1] cursor-pointer"
          onClick={() => goTo("/booking")} // Link tới trang đặt khám
        >
          <p>Cơ sở y tế </p>
        </div>
        <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
          <p>Dịch vụ y tế</p>
        </div>
        <div className="relative">
          <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
            <p>Chuyên khoa</p>
          </div>
        </div>
        <p className="hover:text-[#00B5F1] cursor-pointer">Bác sĩ</p>

        <div className="flex-grow"></div>

        {user ? (
          // === ĐÃ ĐĂNG NHẬP ===
          <div className="flex items-center gap-3">
            {/* SỬA NÚT ĐẶT KHÁM */}
            <div onClick={() => goTo("/booking")}>
              <Button color="bg-[#FFB340]" textColor="text-white">
                Đặt khám
              </Button>
            </div>

            <div onClick={() => goTo("/profile")}>
              <Button color="bg-[#00B5F1]" textColor="text-white">
                Hồ sơ
              </Button>
            </div>

            <span
              className="text-lg font-medium text-gray-700 cursor-pointer hover:text-[#00B5F1] transition-colors ml-2"
              onClick={() => goTo("/profile")}
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
          // === CHƯA ĐĂNG NHẬP ===
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
            {/* SỬA NÚT ĐẶT KHÁM KHI CHƯA LOGIN (Cũng trỏ về booking để họ xem trước) */}
            <div onClick={() => goTo("/booking")}>
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
