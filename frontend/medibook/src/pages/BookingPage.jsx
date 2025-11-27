import React, { useEffect, useState } from "react";
import { ClinicService } from "../api/ClinicService";
import { ClinicDoctorService } from "../api/ClinicDoctorService";
import { ClinicCareService } from "../api/ClinicCareService";
import {
  Search,
  MapPin,
  Star,
  CheckCircle,
  Phone,
  Mail,
  X,
  Stethoscope,
  FileText,
  ChevronRight,
  User,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BookingPage() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  const [selectedClinic, setSelectedClinic] = useState(null);
  const [bookingStep, setBookingStep] = useState("select-type");
  const [modalList, setModalList] = useState([]);
  const [modalLoading, setModalLoading] = useState(false);

  const navigate = useNavigate();

  const fetchClinics = async () => {
    setLoading(true);
    try {
      let res;
      if (!searchTerm.trim()) {
        res = await ClinicService.getAll();
      } else {
        if (searchType === "name") {
          res = await ClinicService.searchByName(searchTerm);
        } else {
          res = await ClinicService.searchByAddress(searchTerm);
        }
      }
      setClinics(res.data);
    } catch (error) {
      console.error("Lỗi tải danh sách phòng khám:", error);
      setClinics([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinics();
  }, []);

  const handleSearch = () => fetchClinics();
  const handleKeyDown = (e) => e.key === "Enter" && handleSearch();

  const openBookingModal = (clinic) => {
    setSelectedClinic(clinic);
    setBookingStep("select-type");
    setModalList([]);
  };

  // --- LOGIC MỚI: GỘP BÁC SĨ VÀ LƯU DANH SÁCH CHUYÊN KHOA ---
  const deduplicateDoctors = (doctorsData) => {
    const doctorMap = new Map();

    doctorsData.forEach((item) => {
      const doctorId = item.doctor?.doctorId;
      if (!doctorId) return;

      if (doctorMap.has(doctorId)) {
        const existing = doctorMap.get(doctorId);
        // Lưu thêm object specialty vào mảng nếu chưa có
        if (
          item.specialty &&
          !existing.specialties.some(
            (s) => s.specialtyId === item.specialty.specialtyId
          )
        ) {
          existing.specialties.push(item.specialty);
          existing.specialtyNames.push(item.specialty.name);
        }
      } else {
        doctorMap.set(doctorId, {
          ...item,
          // Khởi tạo mảng chứa các object chuyên khoa
          specialties: item.specialty ? [item.specialty] : [],
          specialtyNames: item.specialty?.name ? [item.specialty.name] : [],
        });
      }
    });

    return Array.from(doctorMap.values()).map((doc) => ({
      ...doc,
      displaySpecialty: doc.specialtyNames.join(", "),
    }));
  };

  const handleSelectType = async (type) => {
    if (!selectedClinic) return;
    setModalLoading(true);
    setModalList([]);

    try {
      if (type === "doctor") {
        setBookingStep("select-doctor");
        const res = await ClinicDoctorService.getAllDoctorsInClinic(
          selectedClinic.clinicId
        );
        const uniqueDoctors = deduplicateDoctors(res.data);
        setModalList(uniqueDoctors);
      } else if (type === "service") {
        setBookingStep("select-service");
        const res = await ClinicCareService.getAllServicesInClinic(
          selectedClinic.clinicId
        );
        setModalList(res.data);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu chi tiết:", error);
      alert("Không thể tải dữ liệu. Vui lòng thử lại.");
      setBookingStep("select-type");
    } finally {
      setModalLoading(false);
    }
  };

  // --- XỬ LÝ CHỌN ITEM VÀ CHUYỂN TRANG ---
  const handleConfirmSelection = (item) => {
    if (bookingStep === "select-doctor") {
      // Vì hàm deduplicateDoctors đã spread item.doctor ra ngoài object item
      // và gán clinicDoctorId vào item
      // Nên item chính là thông tin bác sĩ cần truyền đi

      // Tạo lại cấu trúc DoctorDTO/ClinicDoctorDTO để trang sau dễ dùng
      const doctorData = {
        clinicDoctorId: item.clinicDoctorId,
        user: item.user, // item có chứa user do spread từ doctor
        licenseNumber: item.licenseNumber,
        careerStartDate: item.careerStartDate,
        // Các thuộc tính khác của bác sĩ...
      };

      navigate("/booking/confirmation", {
        state: {
          clinic: selectedClinic,
          doctor: doctorData, // Truyền object bác sĩ đã chuẩn hóa
          specialties: item.specialties, // Truyền danh sách chuyên khoa
        },
      });
    } else {
      // Logic cho dịch vụ (giữ nguyên hoặc sửa nếu cần)
      alert(`Đã chọn dịch vụ: ${item.name}`);
    }
    setSelectedClinic(null);
  };
  const formatCurrency = (val) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  return (
    <div className="bg-gray-50 min-h-screen pt-8 pb-20 font-['Inter'] relative">
      {/* HEADER SEARCH */}
      <div className="bg-white shadow-sm py-6 sticky top-20 z-10 border-b border-gray-100 mb-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center bg-gray-100 p-2 rounded-full border border-gray-200 shadow-sm">
            <div className="pl-4 text-gray-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              className="flex-grow bg-transparent border-none focus:ring-0 text-gray-700 placeholder-gray-400 text-lg outline-none px-2"
              placeholder={
                searchType === "name"
                  ? "Tìm theo tên cơ sở y tế..."
                  : "Tìm theo địa chỉ..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="relative border-l border-gray-300 pl-4">
              <select
                className="appearance-none bg-transparent text-gray-700 py-2 pr-8 rounded-none border-none focus:ring-0 cursor-pointer font-medium outline-none"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="name">Tên cơ sở</option>
                <option value="address">Địa chỉ</option>
              </select>
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#00B5F1] text-white px-8 py-3 rounded-full font-bold hover:bg-sky-500 transition shadow-md whitespace-nowrap"
            >
              Tìm kiếm
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <button className="px-5 py-1.5 rounded-full bg-[#00B5F1] text-white text-sm font-bold shadow-sm">
              Tất cả
            </button>
            <button className="px-5 py-1.5 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">
              Bệnh viện
            </button>
            <button className="px-5 py-1.5 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">
              Phòng khám
            </button>
            <button className="px-5 py-1.5 rounded-full bg-white text-gray-600 border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">
              Xét nghiệm
            </button>
          </div>
        </div>
      </div>

      {/* DANH SÁCH CLINIC */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : clinics.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              Không tìm thấy cơ sở y tế nào phù hợp.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clinics.map((clinic) => (
              <div
                key={clinic.clinicId}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full"
              >
                <div className="p-6 flex gap-5">
                  <div className="w-24 h-24 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center border border-blue-100 p-1">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        clinic.name
                      )}&background=00B5F1&color=fff&size=128&font-size=0.4`}
                      alt={clinic.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-[#003452] mb-2 flex items-start gap-1 leading-tight">
                      {clinic.name}
                      <CheckCircle
                        size={18}
                        className="text-blue-500 fill-current flex-shrink-0 mt-0.5"
                      />
                    </h3>

                    <div className="space-y-1.5 mb-3">
                      <p className="text-sm text-gray-500 flex items-start gap-2 leading-relaxed">
                        <MapPin
                          size={16}
                          className="flex-shrink-0 mt-0.5 text-gray-400"
                        />
                        <span>{clinic.address}</span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Phone
                          size={16}
                          className="flex-shrink-0 text-gray-400"
                        />
                        <span className="font-medium text-gray-700 hover:text-[#00B5F1] transition-colors cursor-pointer">
                          {clinic.phoneNumber || "Đang cập nhật"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Mail
                          size={16}
                          className="flex-shrink-0 text-gray-400"
                        />
                        <span className="truncate hover:text-[#00B5F1] transition-colors cursor-pointer">
                          {clinic.email || "Đang cập nhật"}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 mt-3">
                      <span className="font-bold text-yellow-500 text-sm">
                        (5)
                      </span>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-gray-100 p-4 bg-gray-50 flex justify-end">
                  <button
                    onClick={() => openBookingModal(clinic)}
                    className="w-full sm:w-auto py-2.5 px-6 bg-[#00B5F1] text-white font-bold rounded-full hover:bg-sky-500 transition shadow-md shadow-sky-100 flex items-center justify-center gap-2"
                  >
                    Đặt khám ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL --- */}
      {selectedClinic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="absolute inset-0"
            onClick={() => setSelectedClinic(null)}
          ></div>

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden transform transition-all scale-100 flex flex-col max-h-[80vh]">
            <div className="bg-[#00B5F1] p-4 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3 overflow-hidden">
                {bookingStep !== "select-type" && (
                  <button
                    onClick={() => setBookingStep("select-type")}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition"
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <h3 className="text-white font-bold text-lg truncate">
                  {bookingStep === "select-type"
                    ? `Đặt khám tại ${selectedClinic.name}`
                    : bookingStep === "select-doctor"
                    ? "Chọn Bác sĩ"
                    : "Chọn Dịch vụ"}
                </h3>
              </div>
              <button
                onClick={() => setSelectedClinic(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition flex-shrink-0"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 bg-gray-50 overflow-y-auto flex-grow">
              {bookingStep === "select-type" && (
                <>
                  <p className="text-center text-gray-600 mb-6">
                    Vui lòng chọn hình thức đặt khám phù hợp
                  </p>
                  <div className="space-y-4">
                    <button
                      onClick={() => handleSelectType("doctor")}
                      className="w-full bg-white p-4 rounded-xl border border-gray-200 hover:border-[#00B5F1] hover:shadow-md transition-all group flex items-center gap-4 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#00B5F1] transition-colors">
                        <Stethoscope
                          size={24}
                          className="text-[#00B5F1] group-hover:text-white transition-colors"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 group-hover:text-[#00B5F1] transition-colors">
                          Khám theo Bác sĩ
                        </h4>
                        <p className="text-sm text-gray-500">
                          Chọn bác sĩ chuyên khoa mong muốn
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-gray-300 group-hover:text-[#00B5F1]"
                      />
                    </button>

                    <button
                      onClick={() => handleSelectType("service")}
                      className="w-full bg-white p-4 rounded-xl border border-gray-200 hover:border-[#00B5F1] hover:shadow-md transition-all group flex items-center gap-4 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-[#00B5F1] transition-colors">
                        <FileText
                          size={24}
                          className="text-[#00B5F1] group-hover:text-white transition-colors"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 group-hover:text-[#00B5F1] transition-colors">
                          Khám Dịch vụ
                        </h4>
                        <p className="text-sm text-gray-500">
                          Đặt theo gói khám và dịch vụ y tế
                        </p>
                      </div>
                      <ChevronRight
                        size={20}
                        className="text-gray-300 group-hover:text-[#00B5F1]"
                      />
                    </button>
                  </div>
                </>
              )}

              {(bookingStep === "select-doctor" ||
                bookingStep === "select-service") && (
                <div>
                  {modalLoading ? (
                    <div className="text-center py-10 text-gray-500">
                      Đang tải danh sách...
                    </div>
                  ) : modalList.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      Không có dữ liệu.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {modalList.map((item, index) => {
                        const isDoctor = bookingStep === "select-doctor";

                        const title = isDoctor
                          ? item.doctor?.user?.name ||
                            `Bác sĩ #${item.doctorId}`
                          : item.name || `Dịch vụ #${item.clinicCareId}`;

                        const subTitle = isDoctor
                          ? item.displaySpecialty
                            ? `Chuyên khoa: ${item.displaySpecialty}`
                            : "Chuyên khoa: Đang cập nhật"
                          : formatCurrency(item.price || 0);

                        return (
                          <div
                            key={index}
                            onClick={() => handleConfirmSelection(item)}
                            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-[#00B5F1] hover:bg-blue-50 cursor-pointer transition flex justify-between items-center group"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isDoctor
                                    ? "bg-green-100 text-green-600"
                                    : "bg-orange-100 text-orange-600"
                                }`}
                              >
                                {isDoctor ? (
                                  <User size={20} />
                                ) : (
                                  <FileText size={20} />
                                )}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800 group-hover:text-[#00B5F1]">
                                  {title}
                                </h4>
                                <p
                                  className={`text-sm ${
                                    isDoctor
                                      ? "text-gray-500"
                                      : "text-[#00B5F1] font-semibold"
                                  }`}
                                >
                                  {subTitle}
                                </p>
                              </div>
                            </div>
                            <button className="px-3 py-1 bg-white border border-[#00B5F1] text-[#00B5F1] text-xs font-bold rounded-full group-hover:bg-[#00B5F1] group-hover:text-white transition">
                              Chọn
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
