import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SlotService } from "../api/SlotService";
import { AppointmentService } from "../api/AppointmentService";
import { useAuth } from "../context/AuthContext";
import { ErrorAlert } from "../components/ErrorAlert";

import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Stethoscope,
  FileText,
  Building2,
  CheckCircle,
  CreditCard,
  Clock,
} from "lucide-react";

export function BookingSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth(); // Lấy thông tin user từ context

  const { clinic, doctor, service } = location.state || {};

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [morningSlots, setMorningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date(tomorrow);
  maxDate.setDate(maxDate.getDate() + 15);

  // 1. Redirect nếu thiếu dữ liệu cơ bản
  useEffect(() => {
    if (!clinic || !doctor || !service) {
      navigate("/booking");
    }
  }, [clinic, doctor, service, navigate]);

  // 2. Load Slots
  useEffect(() => {
    const fetchSlots = async () => {
      setLoadingSlots(true);
      try {
        const [morningRes, afternoonRes] = await Promise.all([
          SlotService.getMorningSlots(),
          SlotService.getAfternoonSlots(),
        ]);
        setMorningSlots(morningRes.data);
        setAfternoonSlots(afternoonRes.data);
      } catch (error) {
        console.error("Lỗi tải slot:", error);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, []);

  const formatCurrency = (val) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  const formatTime = (timeString) => {
    if (!timeString) return "";
    return timeString.substring(0, 5);
  };

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    if (
      newDate.getMonth() < today.getMonth() &&
      newDate.getFullYear() <= today.getFullYear()
    )
      return;
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(newDate);
  };

  const isDateDisabled = (day) => {
    const checkDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < tomorrow || checkDate > maxDate;
  };

  const handleDateClick = (day) => {
    if (!isDateDisabled(day)) {
      const newSelected = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(newSelected);
      setSelectedSlot(null);
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmBooking = async () => {
    // --- KIỂM TRA USER ---
    if (!user || !user.userId) {
      setAlertType("error");
      setAlertMessage(
        "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại."
      );
      // Có thể chuyển hướng về trang đăng nhập sau vài giây nếu muốn
      return;
    }

    if (!selectedDate || !selectedSlot) {
      setAlertType("error");
      setAlertMessage("Vui lòng chọn ngày và giờ khám.");
      return;
    }

    // --- KIỂM TRA CLINIC DOCTOR ID ---
    // Lấy clinicDoctorId từ đối tượng doctor được truyền qua
    // Cần fallback nhiều trường hợp do cấu trúc DTO có thể khác nhau
    const clinicDoctorId =
      doctor.clinicDoctorId ||
      (doctor.doctor ? doctor.doctor.clinicDoctorId : null);

    if (!clinicDoctorId) {
      setAlertType("error");
      setAlertMessage(
        "Lỗi dữ liệu: Không tìm thấy thông tin bác sĩ tại phòng khám này (thiếu clinicDoctorId)."
      );
      console.error("Doctor object thiếu clinicDoctorId:", doctor);
      return;
    }

    setIsSubmitting(true);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const time = selectedSlot.startTime;

    // Format chuẩn ISO 8601 local time: YYYY-MM-DDTHH:mm:ss
    const appointmentDateTime = `${year}-${month}-${day}T${time}`;

    const bookingData = {
      patientId: user.userId, // ID lấy từ AuthContext
      clinicDoctorId: clinicDoctorId,
      clinicCareId: service.clinicCareId,
      slotId: selectedSlot.slotId,
      appointmentDate: appointmentDateTime,
    };

    console.log("Sending Booking Data:", bookingData); // Debug log

    try {
      await AppointmentService.create(bookingData);
      setAlertType("success");
      setAlertMessage(
        "Đặt lịch khám thành công! Đang chuyển hướng về hồ sơ..."
      );
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Lỗi đặt lịch:", error);
      setAlertType("error");
      const msg =
        error.response?.data || "Đặt lịch thất bại. Vui lòng thử lại.";
      // Xử lý msg nếu nó là object
      setAlertMessage(typeof msg === "object" ? JSON.stringify(msg) : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderCalendarGrid = () => {
    const totalDays = daysInMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const startDay = firstDayOfMonth(
      currentDate.getMonth(),
      currentDate.getFullYear()
    );
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const disabled = isDateDisabled(day);
      const checkDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected =
        selectedDate && checkDate.getTime() === selectedDate.getTime();

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`
            h-14 flex items-center justify-center text-sm font-medium rounded-lg cursor-pointer transition-all duration-200 relative
            ${
              disabled
                ? "text-gray-300 bg-gray-50 cursor-not-allowed"
                : isSelected
                ? "bg-[#00B5F1] text-white shadow-md transform scale-105 font-bold"
                : "text-gray-700 hover:bg-blue-50 hover:text-[#00B5F1] border border-transparent hover:border-blue-200"
            }
          `}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  if (!clinic || !doctor || !service) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 font-['Inter'] relative">
      <ErrorAlert
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage(null)}
      />

      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-[#00B5F1] transition mb-6 font-medium"
        >
          <ChevronLeft size={20} /> Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* CỘT TRÁI */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-[#00B5F1] p-4 text-white font-bold text-lg">
                Thông tin đặt khám
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-2">
                    <Building2
                      className="text-[#00B5F1] flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{clinic.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {clinic.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100"></div>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <User size={18} className="text-gray-400 flex-shrink-0" />
                    <div>
                      <span className="block text-gray-500 text-xs uppercase font-semibold mb-1">
                        Bác sĩ
                      </span>
                      <span className="text-gray-800 font-medium">
                        {doctor.doctor?.user?.name ||
                          doctor.user?.name ||
                          "Bác sĩ"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FileText
                      size={18}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <div>
                      <span className="block text-gray-500 text-xs uppercase font-semibold mb-1">
                        Dịch vụ
                      </span>
                      <span className="text-gray-800 font-medium">
                        {service.name}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CreditCard
                      size={18}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <div>
                      <span className="block text-gray-500 text-xs uppercase font-semibold mb-1">
                        Phí khám
                      </span>
                      <span className="text-[#00B5F1] font-bold text-lg">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedDate && selectedSlot && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 animate-fade-in">
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      Thời gian dự kiến:
                    </p>
                    <p className="text-lg font-bold text-[#00B5F1]">
                      {formatTime(selectedSlot.startTime)} -{" "}
                      {selectedDate.toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedSlot || isSubmitting}
                  className={`w-full py-3 px-6 rounded-full font-bold transition shadow-md flex items-center justify-center gap-2 mt-4
                                ${
                                  !selectedDate || !selectedSlot || isSubmitting
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-[#FFB340] text-white hover:bg-orange-400 hover:-translate-y-0.5 transform"
                                }
                            `}
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt khám"}
                </button>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: LỊCH & SLOT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#00B5F1] p-4 text-white font-bold text-lg text-center">
                Vui lòng chọn ngày khám
              </div>
              <div className="p-6">
                <div className="flex justify-center items-center gap-6 mb-6">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="text-xl font-bold text-[#00B5F1] uppercase tracking-wide">
                    Tháng {currentDate.getMonth() + 1} -{" "}
                    {currentDate.getFullYear()}
                  </span>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-7 mb-2">
                  {["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"].map(
                    (d, i) => (
                      <div
                        key={i}
                        className={`text-center font-bold text-sm py-2 ${
                          i === 0 || i === 6
                            ? "text-orange-500"
                            : "text-gray-500"
                        }`}
                      >
                        {d}
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {renderCalendarGrid()}
                </div>
              </div>
            </div>

            {selectedDate && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <Clock className="text-[#00B5F1]" />
                    Giờ khám ngày {selectedDate.toLocaleDateString("vi-VN")}
                  </h3>
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="text-sm text-gray-500 hover:text-red-500 hover:underline"
                  >
                    Đóng
                  </button>
                </div>

                {loadingSlots ? (
                  <div className="text-center py-8 text-gray-500">
                    Đang tải lịch khám...
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4 text-base border-l-4 border-orange-400 pl-3">
                        Buổi sáng
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {morningSlots.length > 0 ? (
                          morningSlots.map((slot) => (
                            <button
                              key={slot.slotId}
                              onClick={() => handleSlotClick(slot)}
                              className={`
                                                    py-2.5 px-2 rounded-lg border text-sm font-medium transition-all duration-200
                                                    ${
                                                      selectedSlot?.slotId ===
                                                      slot.slotId
                                                        ? "bg-[#00B5F1] text-white border-[#00B5F1] shadow-md transform scale-105 ring-2 ring-blue-100"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-[#00B5F1] hover:text-[#00B5F1] hover:shadow-sm"
                                                    }
                                                `}
                            >
                              {formatTime(slot.startTime)} -{" "}
                              {formatTime(slot.endTime)}
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 col-span-full italic pl-2">
                            Không có lịch khám sáng.
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4 text-base border-l-4 border-blue-400 pl-3">
                        Buổi chiều
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {afternoonSlots.length > 0 ? (
                          afternoonSlots.map((slot) => (
                            <button
                              key={slot.slotId}
                              onClick={() => handleSlotClick(slot)}
                              className={`
                                                    py-2.5 px-2 rounded-lg border text-sm font-medium transition-all duration-200
                                                    ${
                                                      selectedSlot?.slotId ===
                                                      slot.slotId
                                                        ? "bg-[#00B5F1] text-white border-[#00B5F1] shadow-md transform scale-105 ring-2 ring-blue-100"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-[#00B5F1] hover:text-[#00B5F1] hover:shadow-sm"
                                                    }
                                                `}
                            >
                              {formatTime(slot.startTime)} -{" "}
                              {formatTime(slot.endTime)}
                            </button>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400 col-span-full italic pl-2">
                            Không có lịch khám chiều.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
