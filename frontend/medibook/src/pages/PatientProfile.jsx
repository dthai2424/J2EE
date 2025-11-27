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
  MapPin,
  Stethoscope,
  Building2,
  CreditCard,
} from "lucide-react";

export function PatientProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile"); // 'profile' hoặc 'history'
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- 1. Gọi API lấy dữ liệu ---
  useEffect(() => {
    if (activeTab === "history" && user?.userId) {
      setLoading(true);
      AppointmentService.getByUserId(user.userId)
        .then((res) => {
          // Backend trả về List<AppointmentDTO> đã có full thông tin
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

  // --- 2. Các hàm Helper Format ---

  // Format tiền (VD: 200.000 ₫)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Format ngày (VD: 20/11/2023)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  // Format giờ (Cắt giây nếu cần, VD: 08:00:00 -> 08:00)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  // Render Badge trạng thái
  const renderStatus = (status) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-green-200">
            <CheckCircle size={12} /> Hoàn thành
          </span>
        );
      case "CONFIRMED":
        return (
          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-blue-200">
            <CheckCircle size={12} /> Đã xác nhận
          </span>
        );
      case "CANCELLED":
        return (
          <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-red-200">
            <XCircle size={12} /> Đã hủy
          </span>
        );
      default: // PENDING
        return (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-yellow-200">
            <Clock size={12} /> Chờ xác nhận
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-20 font-['Inter']">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl">
        {/* === SIDEBAR TRÁI === */}
        <div className="col-span-1 h-fit">
          {/* Nút Thêm Hồ Sơ */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <button className="w-full bg-[#00B5F1] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md shadow-sky-200">
              <PlusCircle size={20} />
              Thêm hồ sơ người thân
            </button>
          </div>

          {/* Menu Navigation */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
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
                Hồ sơ cá nhân
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
                Lịch sử khám bệnh
              </button>
              <button className="flex items-center gap-3 px-6 py-4 text-left font-medium text-gray-600 hover:bg-gray-50 border-l-4 border-transparent">
                <Bell size={20} />
                Thông báo
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
                  3
                </span>
              </button>
            </nav>
          </div>
        </div>

        {/* === CONTENT PHẢI === */}
        <div className="col-span-1 md:col-span-3">
          {/* --- TAB 1: THÔNG TIN BỆNH NHÂN --- */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b">
                Thông tin tài khoản
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <label className="text-sm text-gray-500 font-medium mb-1 block">
                    Họ và tên
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.name || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium mb-1 block">
                    Số điện thoại
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.phoneNumber || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium mb-1 block">
                    Email
                  </label>
                  <p className="text-lg font-semibold text-gray-900">
                    {user?.email || "Chưa cập nhật"}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium mb-1 block">
                    Vai trò
                  </label>
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">
                    {user?.role || "Bệnh nhân"}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <button className="text-[#00B5F1] font-semibold hover:underline flex items-center gap-1">
                  <User size={16} /> Chỉnh sửa thông tin
                </button>
              </div>
            </div>
          )}

          {/* --- TAB 2: LỊCH SỬ KHÁM (Đã Link dữ liệu thật) --- */}
          {activeTab === "history" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Danh sách phiếu khám
              </h2>

              {loading ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-gray-500 animate-pulse">
                    Đang tải dữ liệu...
                  </p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="bg-white p-12 rounded-xl shadow-sm text-center border border-gray-100">
                  <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText size={40} className="text-gray-300" />
                  </div>
                  <p className="text-gray-500 mb-4">
                    Bạn chưa có lịch sử đặt khám nào.
                  </p>
                  <a
                    href="/"
                    className="text-[#00B5F1] font-bold hover:underline"
                  >
                    Đặt lịch ngay
                  </a>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {appointments.map((app) => (
                    // --- CARD APPOINTMENT ---
                    <div
                      key={app.appointmentId}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden"
                    >
                      {/* Header Card */}
                      <div className="p-5 border-b border-gray-50 bg-gray-50/50 flex justify-between items-start">
                        <div className="flex gap-3">
                          <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 h-fit">
                            <Building2 size={24} className="text-[#00B5F1]" />
                          </div>
                          <div>
                            {/* LINK DATA: Tên phòng khám */}
                            <h3 className="text-lg font-bold text-[#003452] uppercase">
                              {app.clinic?.name || "Phòng khám"}
                            </h3>
                            {/* LINK DATA: Địa chỉ phòng khám */}
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin size={14} className="flex-shrink-0" />
                              {app.clinic?.address}
                            </p>
                          </div>
                        </div>
                        {/* LINK DATA: Trạng thái */}
                        {renderStatus(app.status)}
                      </div>

                      {/* Body Card */}
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm text-gray-700">
                        <div className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                            <Calendar size={16} className="text-[#00B5F1]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Ngày khám</p>
                            {/* LINK DATA: Ngày khám */}
                            <p className="font-semibold text-base">
                              {formatDate(app.appointmentDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                            <Clock size={16} className="text-[#00B5F1]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Giờ khám</p>
                            {/* LINK DATA: Slot khám */}
                            <p className="font-semibold text-base">
                              {formatTime(app.slot?.startTime)} -{" "}
                              {formatTime(app.slot?.endTime)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                            <Stethoscope size={16} className="text-[#00B5F1]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Bác sĩ</p>
                            {/* LINK DATA: Tên bác sĩ */}
                            <p className="font-semibold text-base">
                              {app.doctor?.user?.name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 group">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
                            <FileText size={16} className="text-[#00B5F1]" />
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs">Dịch vụ</p>
                            {/* LINK DATA: Tên dịch vụ */}
                            <p className="font-semibold text-base">
                              {app.clinicCare?.name}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Footer Card */}
                      <div className="px-5 py-4 bg-[#F9FAFB] flex justify-between items-center border-t border-gray-100">
                        <div className="text-xs text-gray-400">
                          Mã phiếu: #{app.appointmentId}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard size={16} className="text-gray-400" />
                          <span className="text-gray-600 text-sm font-medium">
                            Phí khám:
                          </span>
                          {/* LINK DATA: Giá tiền */}
                          <span className="text-lg font-bold text-[#00B5F1]">
                            {formatCurrency(app.clinicCare?.price || 0)}
                          </span>
                        </div>
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
