import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import { User, Building2, Stethoscope, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 mt-20">
      <div className="w-64 fixed h-full z-10">
        <Sidebar aria-label="Admin Sidebar">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={Link}
                to="/admin/doctors"
                icon={User}
                active={location.pathname === "/admin/doctors"}
              >
                Quản lý Bác sĩ
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/admin/clinics"
                icon={Building2}
                active={location.pathname === "/admin/clinics"}
              >
                Quản lý Phòng khám
              </Sidebar.Item>
              <Sidebar.Item
                as={Link}
                to="/admin/specialties"
                icon={Stethoscope}
                active={location.pathname === "/admin/specialties"}
              >
                Quản lý Chuyên khoa
              </Sidebar.Item>
              <Sidebar.Item
                onClick={handleLogout}
                icon={LogOut}
                className="cursor-pointer text-red-600 hover:bg-red-50"
              >
                Đăng xuất
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
      <div className="ml-64 p-8 w-full">
        <Outlet />
      </div>
    </div>
  );
}
