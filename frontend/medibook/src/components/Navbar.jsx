import logo from "../assets/logo_new.png";
import { Button } from "./Button.jsx";
import { Dropdown } from "./Dropdown.jsx";
import { useNavigate } from "react-router-dom";
function goTo(path) {
  console.log("asd");
  window.location.href = path;
}

// addHref("signinButton", ` /auth`);
// addHref("signupButton", ` /auth`);
export function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white pl-10 pr-10 pt-2 pb-2 border-b-1 z-100">
      <div className="flex h-20 items-center gap-13 text-xl font-semibold  ">
        <div className="flex items-center gap-5" onClick={() => goTo("/")}>
          <img src={logo} className=" h-20 w-30" alt="Logo" />
          <p className="text-[#00B5F1] text-3xl">MediBook</p>
        </div>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p className="hover:text-[#00B5F1]" onClick={() => goTo("/")}>
          Trang chủ{" "}
        </p>
        <div className="flex items-center hover:text-[#00B5F1]">
          <p>Cơ sở y tế </p>
          <span className="text-2xl">&#9662;</span>
        </div>
        <div className="flex items-center hover:text-[#00B5F1]">
          <p>Dịch vụ y tế</p>
          <span className="text-2xl">&#9662;</span>
        </div>
        <div className="relative">
          <div className="flex items-center hover:text-[#00B5F1]">
            <p>Chuyên khoa</p>
            <span className="text-2xl">&#9662;</span>
          </div>
          <Dropdown />
        </div>
        <p className="hover:text-[#00B5F1]">Bác sĩ</p>
        <div onClick={() => goTo("/auth")}>
          <Button color="bg-[#00B5F1]" id="signupButton" textColor="text-white">
            Đăng ký
          </Button>
        </div>
        <div onClick={() => goTo("/auth")}>
          <Button color="bg-[#FFB340]" id="signinButton" textColor="text-white">
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}
