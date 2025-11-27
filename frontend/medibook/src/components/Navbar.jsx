import React, { useState, useEffect } from "react";
import logo from "../assets/logo_new.png";
import { Button } from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ClinicService } from "../api/ClinicService";
import { ClinicCareService } from "../api/ClinicCareService"; // Import mới
import { SpecialtyService } from "../api/SpecialtyService"; // Import mới

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State cho dropdown
  const [clinics, setClinics] = useState([]);
  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);

  // State hiển thị
  const [showClinicDropdown, setShowClinicDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showSpecialtyDropdown, setShowSpecialtyDropdown] = useState(false);

  const goTo = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Gọi API lấy dữ liệu (chỉ lấy 1 lần khi mount)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Clinics
        const resClinics = await ClinicService.getAll();
        setClinics(resClinics.data.slice(0, 10));

        // Fetch Services
        const resServices = await ClinicCareService.getAll();
        setServices(resServices.data.slice(0, 10));

        // Fetch Specialties
        const resSpecialties = await SpecialtyService.getAll();
        setSpecialties(resSpecialties.data.slice(0, 10));
      } catch (error) {
        console.error("Lỗi tải dữ liệu Navbar:", error);
      }
    };
    fetchData();
  }, []);

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

        {/* --- DROPDOWN CƠ SỞ Y TẾ --- */}
        <div
          className="relative group h-full flex items-center"
          onMouseEnter={() => setShowClinicDropdown(true)}
          onMouseLeave={() => setShowClinicDropdown(false)}
        >
          <div
            className="flex items-center hover:text-[#00B5F1] cursor-pointer"
            onClick={() => goTo("/booking")}
          >
            <p>Cơ sở y tế </p>
            <span className="text-2xl ml-1">&#9662;</span>
          </div>

          {showClinicDropdown && (
            <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
              <div className="py-2">
                {clinics.length > 0 ? (
                  clinics.map((clinic) => (
                    <div
                      key={clinic.clinicId}
                      className="px-4 py-3 hover:bg-blue-50 hover:text-[#00B5F1] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                      onClick={() => goTo("/booking")}
                    >
                      <p className="text-sm font-medium truncate">
                        {clinic.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {clinic.address}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    Đang tải...
                  </div>
                )}
                <div
                  className="px-4 py-2 text-center text-xs font-bold text-[#00B5F1] hover:underline cursor-pointer bg-gray-50"
                  onClick={() => goTo("/booking")}
                >
                  Xem tất cả
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- DROPDOWN DỊCH VỤ Y TẾ --- */}
        <div
          className="relative group h-full flex items-center"
          onMouseEnter={() => setShowServiceDropdown(true)}
          onMouseLeave={() => setShowServiceDropdown(false)}
        >
          <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
            <p>Dịch vụ y tế</p>
            <span className="text-2xl ml-1">&#9662;</span>
          </div>

          {showServiceDropdown && (
            <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
              <div className="py-2">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div
                      key={service.clinicCareId}
                      className="px-4 py-3 hover:bg-blue-50 hover:text-[#00B5F1] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                      onClick={() => goTo("/booking")}
                    >
                      <p className="text-sm font-medium truncate">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(service.price)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    Đang tải...
                  </div>
                )}
                <div
                  className="px-4 py-2 text-center text-xs font-bold text-[#00B5F1] hover:underline cursor-pointer bg-gray-50"
                  onClick={() => goTo("/booking")}
                >
                  Xem tất cả
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- DROPDOWN CHUYÊN KHOA --- */}
        <div
          className="relative group h-full flex items-center"
          onMouseEnter={() => setShowSpecialtyDropdown(true)}
          onMouseLeave={() => setShowSpecialtyDropdown(false)}
        >
          <div className="flex items-center hover:text-[#00B5F1] cursor-pointer">
            <p>Chuyên khoa</p>
            <span className="text-2xl ml-1">&#9662;</span>
          </div>

          {showSpecialtyDropdown && (
            <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
              <div className="py-2">
                {specialties.length > 0 ? (
                  specialties.map((spec) => (
                    <div
                      key={spec.specialtyId}
                      className="px-4 py-3 hover:bg-blue-50 hover:text-[#00B5F1] cursor-pointer transition-colors border-b border-gray-50 last:border-none"
                      onClick={() => goTo("/booking")}
                    >
                      <p className="text-sm font-medium truncate">
                        {spec.name}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    Đang tải...
                  </div>
                )}
                <div
                  className="px-4 py-2 text-center text-xs font-bold text-[#00B5F1] hover:underline cursor-pointer bg-gray-50"
                  onClick={() => goTo("/booking")}
                >
                  Xem tất cả
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-grow"></div>

        {user ? (
          // === ĐÃ ĐĂNG NHẬP ===
          <div className="flex items-center gap-3">
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
