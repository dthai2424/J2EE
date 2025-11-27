import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClinicCareService } from "../api/ClinicCareService";
import {
  MapPin,
  Phone,
  Mail,
  User,
  Stethoscope,
  ChevronLeft,
  CheckCircle,
  Star,
} from "lucide-react";

export function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { clinic, doctor, specialties } = location.state || {};

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clinic || !doctor) {
      navigate("/booking");
    }
  }, [clinic, doctor, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      if (!clinic) return;
      setLoading(true);
      try {
        const res = await ClinicCareService.getAllServicesInClinic(
          clinic.clinicId
        );
        const allServices = res.data;

        if (specialties && specialties.length > 0) {
          const specialtyIds = specialties.map((s) => s.specialtyId);
          const filteredServices = allServices.filter((svc) =>
            specialtyIds.includes(svc.specialtyId)
          );
          setServices(filteredServices);
        } else {
          setServices(allServices);
        }
      } catch (error) {
        console.error("Lỗi tải danh sách dịch vụ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [clinic, specialties]);

  const handleConfirm = () => {
    if (!selectedServiceId) {
      alert("Vui lòng chọn dịch vụ khám!");
      return;
    }
    const selectedService = services.find(
      (s) => s.clinicCareId === parseInt(selectedServiceId)
    );

    // --- THAY ĐỔI Ở ĐÂY: Chuyển sang trang Chọn Ngày (Schedule) ---
    navigate("/booking/schedule", {
      state: {
        clinic,
        doctor,
        service: selectedService, // Truyền thêm dịch vụ đã chọn
      },
    });
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  if (!clinic || !doctor) return null;

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 font-['Inter']">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-[#00B5F1] transition mb-6 font-medium"
        >
          <ChevronLeft size={20} /> Quay lại
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CỘT TRÁI: THÔNG TIN CƠ SỞ Y TẾ */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-[#00B5F1] p-4 text-white font-bold text-lg flex items-center gap-2">
                <CheckCircle size={20} /> Thông tin cơ sở y tế
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 flex-shrink-0">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        clinic.name
                      )}&background=00B5F1&color=fff`}
                      alt={clinic.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 leading-tight">
                      {clinic.name}
                    </h3>
                    <div className="flex text-yellow-400 mt-1 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex gap-3">
                    <MapPin size={18} className="text-gray-400 flex-shrink-0" />
                    <span>{clinic.address}</span>
                  </p>
                  <p className="flex gap-3">
                    <Phone size={18} className="text-gray-400 flex-shrink-0" />
                    <span>{clinic.phoneNumber}</span>
                  </p>
                  <p className="flex gap-3">
                    <Mail size={18} className="text-gray-400 flex-shrink-0" />
                    <span>{clinic.email}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: THÔNG TIN BÁC SĨ & CHỌN DỊCH VỤ */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Stethoscope className="text-[#00B5F1]" /> Thông tin Bác sĩ
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 border-2 border-white shadow-md overflow-hidden">
                  <User size={40} className="text-gray-400" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold text-[#003452] mb-2">
                    {doctor.username}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Chuyên khoa:
                      </span>{" "}
                      {specialties?.map((s) => s.name).join(", ") ||
                        "Đang cập nhật"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Giấy phép:
                      </span>{" "}
                      {doctor.licenseNumber}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Kinh nghiệm:
                      </span>{" "}
                      Từ năm {new Date(doctor.careerStartDate).getFullYear()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-[#00B5F1] p-4 text-white font-bold text-lg text-center">
                Vui lòng chọn dịch vụ
              </div>
              <div className="p-8">
                {loading ? (
                  <div className="text-center py-4 text-gray-500">
                    Đang tải dịch vụ...
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-4 text-red-500">
                    Bác sĩ này chưa có dịch vụ nào tại phòng khám.
                  </div>
                ) : (
                  <div className="max-w-xl mx-auto">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dịch vụ khám
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#00B5F1] focus:border-[#00B5F1] block p-3 pr-10 appearance-none cursor-pointer shadow-sm"
                        value={selectedServiceId}
                        onChange={(e) => setSelectedServiceId(e.target.value)}
                      >
                        <option value="" disabled>
                          -- Chọn dịch vụ --
                        </option>
                        {services.map((service) => (
                          <option
                            key={service.clinicCareId}
                            value={service.clinicCareId}
                          >
                            {service.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>

                    {selectedServiceId && (
                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 flex justify-between items-center animate-fade-in">
                        <span className="text-gray-700 font-medium">
                          Giá dịch vụ:
                        </span>
                        <span className="text-2xl font-bold text-[#00B5F1]">
                          {formatCurrency(
                            services.find(
                              (s) =>
                                s.clinicCareId === parseInt(selectedServiceId)
                            )?.price || 0
                          )}
                        </span>
                      </div>
                    )}

                    <div className="mt-8 text-center">
                      <button
                        onClick={handleConfirm}
                        className="w-full bg-[#00B5F1] text-white font-bold py-3 px-8 rounded-full hover:bg-sky-600 transition shadow-lg shadow-sky-200 transform hover:-translate-y-0.5"
                      >
                        Xác nhận đặt khám
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
