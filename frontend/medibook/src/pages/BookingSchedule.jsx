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
  Sun,
  Moon,
} from "lucide-react";

export function BookingSchedule() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { clinic, doctor, service } = location.state || {};

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const [morningSlots, setMorningSlots] = useState([]);
  const [afternoonSlots, setAfternoonSlots] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const [bookedSlotIds, setBookedSlotIds] = useState([]);

  const [loadingSlots, setLoadingSlots] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date(tomorrow);
  maxDate.setDate(maxDate.getDate() + 15);

  useEffect(() => {
    if (!clinic || !doctor || !service) {
      navigate("/booking");
    }
  }, [clinic, doctor, service, navigate]);

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

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate || !doctor) return;

      setCheckingAvailability(true);

      setBookedSlotIds([]);

      let doctorIdToCheck = null;

      if (doctor.doctor && doctor.doctor.doctorId) {
        doctorIdToCheck = doctor.doctor.doctorId;
      } else if (doctor.doctorId) {
        doctorIdToCheck = doctor.doctorId;
      } else if (doctor.id) {
        doctorIdToCheck = doctor.id;
      }

      console.log("Doctor Object:", doctor);
      console.log("Doctor ID to check:", doctorIdToCheck);

      if (!doctorIdToCheck) {
        console.error(
          "Không tìm thấy ID bác sĩ để check lịch. Object:",
          doctor
        );
        setCheckingAvailability(false);
        return;
      }

      try {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;

        const res = await AppointmentService.getAppointmentsByDoctorAndDate(
          doctorIdToCheck,
          dateStr
        );

        const ids = res.data
          .filter((app) => app.status !== "CANCELLED")
          .map((app) => app.slot.slotId);

        setBookedSlotIds(ids);
      } catch (error) {
        console.error("Lỗi check lịch trùng:", error);
      } finally {
        setCheckingAvailability(false);
      }
    };

    if (selectedDate) {
      fetchBookedSlots();
    } else {
      setBookedSlotIds([]);
    }
  }, [selectedDate, doctor]);

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

  // --- SUBMIT ---
  const handleConfirmBooking = async () => {
    if (!user || !user.userId) {
      setAlertType("error");
      setAlertMessage(
        "Phiên đăng nhập không hợp lệ. Vui lòng đăng xuất và đăng nhập lại."
      );
      return;
    }
    if (!selectedDate || !selectedSlot) {
      setAlertType("error");
      setAlertMessage("Vui lòng chọn ngày và giờ khám.");
      return;
    }

    let clinicDoctorId = null;
    if (doctor.clinicDoctorId) {
      clinicDoctorId = doctor.clinicDoctorId;
    } else if (doctor.doctor && doctor.doctor.clinicDoctorId) {
      clinicDoctorId = doctor.doctor.clinicDoctorId;
    }

    console.log("Doctor Object for Booking:", doctor);
    console.log("Extracted ClinicDoctorID:", clinicDoctorId);

    if (!clinicDoctorId) {
      setAlertType("error");
      setAlertMessage(
        `Lỗi dữ liệu: Không tìm thấy mã liên kết bác sĩ (ClinicDoctorId). Vui lòng chọn lại bác sĩ.`
      );
      return;
    }

    setIsSubmitting(true);

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");

    const timeString = selectedSlot.startTime;

    const time = timeString.length === 5 ? `${timeString}:00` : timeString;
    const appointmentDateTime = `${year}-${month}-${day}T${time}`;

    const bookingData = {
      patientId: user.userId,
      clinicDoctorId: clinicDoctorId,
      clinicCareId: service.clinicCareId,
      slotId: selectedSlot.slotId,
      appointmentDate: appointmentDateTime,
    };

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
      const msg = error.response?.data || "Đặt lịch thất bại.";
      setAlertMessage(typeof msg === "object" ? JSON.stringify(msg) : msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER HELPERS ---
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

  const renderSlotButton = (slot) => {
    const isBooked = bookedSlotIds.includes(slot.slotId);
    const isSelected = selectedSlot?.slotId === slot.slotId;

    return (
      <button
        key={slot.slotId}
        onClick={() => !isBooked && setSelectedSlot(slot)}
        disabled={isBooked}
        className={`
            py-2.5 px-4 rounded-lg border text-sm font-medium transition-all duration-200 relative min-w-[100px]
            ${
              isBooked
                ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
                : isSelected
                ? "bg-[#00B5F1] text-white border-[#00B5F1] shadow-md transform scale-105 ring-2 ring-blue-100"
                : "bg-white text-gray-700 border-gray-200 hover:border-[#00B5F1] hover:text-[#00B5F1] hover:shadow-sm"
            }
        `}
      >
        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
        {isBooked && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm z-10">
            Kín
          </span>
        )}
      </button>
    );
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
          {/* --- CỘT TRÁI: CARD THÔNG TIN --- */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-none shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-[#00B5F1] p-4 text-white font-bold text-lg text-center uppercase">
                Thông tin đặt khám
              </div>
              <div className="p-6 space-y-6 bg-[#F4F9FD]">
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <Building2
                      className="text-gray-500 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <div>
                      <h3 className="font-bold text-[#003452] text-lg">
                        {clinic.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {clinic.address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200"></div>

                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <div className="w-6 flex justify-center">
                      <Stethoscope size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <span className="block text-[#003452] font-bold">
                        Chuyên khoa:
                      </span>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 flex justify-center">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <span className="block text-[#003452] font-bold">
                        Bác sĩ:
                      </span>
                      <span className="text-gray-700">
                        {doctor.doctor?.user?.name ||
                          doctor.user?.name ||
                          "Bác sĩ"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 flex justify-center">
                      <FileText size={18} className="text-gray-400" />
                    </div>
                    <div>
                      <span className="block text-[#003452] font-bold">
                        Dịch vụ:
                      </span>
                      <span className="text-gray-700">{service.name}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 flex justify-center">
                      <CreditCard
                        size={18}
                        className="text-gray-400 flex-shrink-0"
                      />
                    </div>
                    <div>
                      <span className="block text-[#003452] font-bold">
                        Phí khám:
                      </span>
                      <span className="text-[#00B5F1] font-bold text-lg">
                        {formatCurrency(service.price)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thời gian đã chọn */}
                {selectedDate && selectedSlot && (
                  <div className="bg-white p-3 border border-blue-200 shadow-sm rounded-md">
                    <p className="text-xs text-gray-500 font-bold mb-1 uppercase">
                      Thời gian khám:
                    </p>
                    <p className="text-base font-bold text-[#00B5F1]">
                      {formatTime(selectedSlot.startTime)} -{" "}
                      {formatTime(selectedSlot.endTime)}
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      Ngày {selectedDate.toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedSlot || isSubmitting}
                  className={`w-full py-3 px-6 rounded font-bold transition shadow-md mt-4 text-white
                                ${
                                  !selectedDate || !selectedSlot || isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#00B5F1] hover:bg-sky-600 transform hover:-translate-y-0.5"
                                }
                            `}
                >
                  {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt khám"}
                </button>
              </div>
            </div>
          </div>

          {/* --- CỘT PHẢI: LỊCH & SLOT --- */}
          <div className="lg:col-span-8 space-y-6">
            {/* Calendar */}
            <div className="bg-white border border-gray-100 shadow-sm p-6 rounded-b-lg">
              <div className="bg-[#00D4FF] p-4 text-white font-bold text-xl text-center rounded-t-lg shadow-sm -mx-6 -mt-6 mb-6">
                Vui lòng chọn ngày khám
              </div>

              <div className="flex justify-center items-center gap-4 mb-6">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition text-[#00B5F1]"
                >
                  <ChevronLeft size={32} />
                </button>
                <span className="text-xl font-bold text-[#00B5F1] uppercase">
                  THÁNG {currentDate.getMonth() + 1} -{" "}
                  {currentDate.getFullYear()}
                </span>
                <button
                  onClick={handleNextMonth}
                  className="p-1 hover:bg-gray-100 rounded-full transition text-[#00B5F1]"
                >
                  <ChevronRight size={32} />
                </button>
              </div>

              <div className="grid grid-cols-7 mb-2 border-b border-gray-200 pb-2">
                {["CN", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy"].map((d, i) => (
                  <div
                    key={i}
                    className={`text-center font-bold text-base py-2 ${
                      i === 0 || i === 6 ? "text-[#E58E26]" : "text-[#003452]"
                    }`}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 border-l border-t border-gray-100">
                {renderCalendarGrid()}
              </div>

              {/* SLOTS: Hiện khi đã chọn ngày */}
              {selectedDate && (
                <div className="mt-8 animate-fade-in">
                  <div className="flex justify-between items-center border-b-2 border-[#00D4FF] pb-2 mb-6">
                    <span className="font-bold text-lg text-gray-800">
                      Giờ khám ngày {selectedDate.toLocaleDateString("vi-VN")}
                    </span>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-sm text-gray-500 hover:text-red-500 underline"
                    >
                      Chọn lại ngày
                    </button>
                  </div>

                  {loadingSlots || checkingAvailability ? (
                    <div className="text-center py-8 text-gray-500 italic">
                      Đang kiểm tra lịch trống...
                    </div>
                  ) : (
                    <div className="space-y-8 pl-2">
                      {/* BUỔI SÁNG */}
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                          <Sun size={20} className="text-orange-400" /> Buổi
                          sáng
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {morningSlots.length > 0 ? (
                            morningSlots.map((slot) => renderSlotButton(slot))
                          ) : (
                            <span className="text-gray-400 italic text-sm col-span-full">
                              Không có lịch sáng.
                            </span>
                          )}
                        </div>
                      </div>

                      {/* BUỔI CHIỀU */}
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                          <Moon size={20} className="text-blue-500" /> Buổi
                          chiều
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {afternoonSlots.length > 0 ? (
                            afternoonSlots.map((slot) => renderSlotButton(slot))
                          ) : (
                            <span className="text-gray-400 italic text-sm col-span-full">
                              Không có lịch chiều.
                            </span>
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
    </div>
  );
}
