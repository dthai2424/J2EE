import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppointmentService } from "../api/AppointmentService";
import {
  User,
  Calendar,
  FileText,
  Bell,
  PlusCircle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export function PatientProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' hoặc 'history'
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Gọi API lấy lịch sử khám khi chuyển sang tab 'history'
  useEffect(() => {
    if (activeTab === "history" && user?.userId) {
      setLoading(true);
      AppointmentService.getByUserId(user.userId)
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => {
          console.error("Lỗi lấy lịch sử khám:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeTab, user]);

  // Helper để hiển thị trạng thái (Badge)
  const renderStatus = (status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={12} /> Đã khám xong
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={12} /> Đã xác nhận
          </span>
        );
      case "CANCELLED":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <XCircle size={12} /> Đã hủy
          </span>
        );
      default: // PENDING
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Clock size={12} /> Chờ xác nhận
          </span>
        );
    }
  };

  // Helper format ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-20 font-['Inter']">
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* === SIDEBAR TRÁI === */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <button className="w-full bg-[#00B5F1] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition">
              <PlusCircle size={20} />
              Thêm hồ sơ
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-6 py-4 text-left font-medium border-l-4 transition-all ${
                  activeTab === "profile"
                    ? "border-[#00B5F1] text-[#00B5F1] bg-sky-50"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User size={20} />
                Hồ sơ bệnh nhân
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`flex items-center gap-3 px-6 py-4 text-left font-medium border-l-4 transition-all ${
                  activeTab === "history"
                    ? "border-[#00B5F1] text-[#00B5F1] bg-sky-50"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                <FileText size={20} />
                Phiếu khám bệnh
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-gray-600 hover:bg-gray-50 border-l-4 border-transparent">
                <Bell size={20} />
                Thông báo{" "}
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                  99+
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* === CONTENT PHẢI === */}
        <div className="col-span-1 md:col-span-3">
          {/* --- TAB 1: THÔNG TIN BỆNH NHÂN --- */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Danh sách hồ sơ bệnh nhân
              </h2>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Họ và tên</p>
                    <h3 className="text-xl font-bold text-[#00B5F1] uppercase">
                      {user?.name || "Chưa cập nhật tên"}
                    </h3>
                  </div>
                  {/* Các nút hành động giả lập */}
                  <div className="flex gap-4 mt-4 md:mt-0 text-sm font-medium">
                    <button className="text-red-500 hover:underline flex items-center gap-1">
                      Xóa hồ sơ
                    </button>
                    <button className="text-[#00B5F1] hover:underline flex items-center gap-1">
                      Sửa hồ sơ
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700">
                  <div className="flex items-center gap-3">
                    <Calendar className="text-gray-400" size={18} />
                    <span className="font-medium">Ngày sinh:</span>
                    <span>15/09/1990 (Dữ liệu mẫu)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={18} />
                    <span className="font-medium">Giới tính:</span>
                    <span>Nam (Dữ liệu mẫu)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-gray-400">
                      <i className="fa-solid fa-phone w-[18px]"></i>
                    </div>
                    <span className="font-medium">Số điện thoại:</span>
                    <span>{user?.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="text-gray-400" size={18} />
                    <span className="font-medium">Email:</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-start gap-3">
                    <div className="text-gray-400 mt-1">
                      <i className="fa-solid fa-location-dot w-[18px]"></i>
                    </div>
                    <div>
                      <span className="font-medium">Địa chỉ:</span>
                      <span className="ml-2">
                        Thành phố Hồ Chí Minh (Dữ liệu mẫu)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB 2: PHIẾU KHÁM BỆNH (Appointment History) --- */}
          {activeTab === "history" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Lịch sử đặt khám
              </h2>

              {loading ? (
                <div className="text-center py-10">Đang tải dữ liệu...</div>
              ) : appointments.length === 0 ? (
                <div className="bg-white p-10 rounded-xl shadow-sm text-center text-gray-500">
                  Bạn chưa có lịch sử khám bệnh nào.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {appointments.map((app) => (
                    // --- CARD APPOINTMENT ---
                    <div
                      key={app.appointmentId}
                      className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#00B5F1] hover:shadow-md transition-shadow relative"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-lg text-gray-800">
                          Phiếu khám #{app.appointmentId}
                        </h4>
                        {renderStatus(app.status)}
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex gap-2">
                          <Clock size={16} className="text-[#00B5F1]" />
                          <span className="font-semibold">Thời gian:</span>
                          {formatDate(app.appointmentDate)}
                        </p>

                        {/* Lưu ý: Backend DTO hiện chỉ trả về ID, chưa có tên Bác sĩ/Dịch vụ */}
                        <p className="flex gap-2">
                          <User size={16} className="text-[#00B5F1]" />
                          <span className="font-semibold">Mã Bác sĩ:</span>
                          {app.clinicDoctorId}
                        </p>

                        <p className="flex gap-2">
                          <FileText size={16} className="text-[#00B5F1]" />
                          <span className="font-semibold">Mã Dịch vụ:</span>
                          {app.clinicCareId}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t flex justify-end">
                        <button className="text-[#00B5F1] text-sm font-semibold hover:underline">
                          Xem chi tiết &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
