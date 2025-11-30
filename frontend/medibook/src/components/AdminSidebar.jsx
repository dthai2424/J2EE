import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Building2,
  Stethoscope,
  LogOut,
  CalendarCheck,
  Watch,
  Hospital,
} from "lucide-react"; // Import CalendarCheck
import { useAuth } from "../context/AuthContext";

export function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  // Mảng chứa các item trong menu
  const menuItems = [
    {
      path: "/admin/appointments", // Đường dẫn mới
      label: "Quản lý Cuộc hẹn",
      icon: CalendarCheck, // Icon mới
    },
    {
      path: "/admin/doctors",
      label: "Quản lý Bác sĩ",
      icon: User,
    },
    {
      path: "/admin/clinics",
      label: "Quản lý Phòng khám",
      icon: Building2,
    },
    {
      path: "/admin/specialties",
      label: "Quản lý Chuyên khoa",
      icon: Stethoscope,
    },
    {
      path: "/admin/slots",
      label: "Quản lý suất khám",
      icon: Watch,
    },
    {
      path: "/admin/cliniccare",
      label: "Quản lý dịch vụ",
      icon: Hospital,
    },
  ];

  return (
    <aside className="w-full h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header Sidebar */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <span className="text-xl font-bold text-[#00B5F1] uppercase tracking-wider">
          Admin Panel
        </span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                ${
                  isActive
                    ? "bg-sky-50 text-[#00B5F1]" // Active state
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" // Normal state
                }
              `}
            >
              <Icon
                size={20}
                className={`mr-3 ${
                  isActive ? "text-[#00B5F1]" : "text-gray-400"
                }`}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Sidebar (Logout) */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} className="mr-3" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
