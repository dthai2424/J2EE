import React, { useEffect, useState } from "react";
import { ClinicCareService } from "../../api/ClinicCareService";
import { ClinicService } from "../../api/ClinicService";
import { SpecialtyService } from "../../api/SpecialtyService";

export function ClinicCareManager() {
  const [cares, setCares] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const initialFormState = {
    clinicCareId: 0,
    clinicId: "", // ID được chọn từ dropdown
    specialtyId: "", // ID được chọn từ dropdown
    name: "",
    description: "",
    price: 0,
    active: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  // Helper Format
  const formatCurrency = (val) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(val);

  // --- FETCH DATA ---
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [caresRes, clinicsRes, specialtiesRes] = await Promise.all([
        ClinicCareService.getAll(),
        ClinicService.getAll(),
        SpecialtyService.getAll(),
      ]);
      setCares(caresRes.data);
      setClinics(clinicsRes.data.filter((c) => c.active)); // Chỉ lấy clinic active
      setSpecialties(specialtiesRes.data.filter((s) => s.active)); // Chỉ lấy specialty active

      // Đặt giá trị mặc định cho dropdown nếu có dữ liệu
      if (clinicsRes.data.length > 0 && formData.clinicId === "") {
        setFormData((prev) => ({
          ...prev,
          clinicId: clinicsRes.data[0].clinicId,
        }));
      }
      if (specialtiesRes.data.length > 0 && formData.specialtyId === "") {
        setFormData((prev) => ({
          ...prev,
          specialtyId: specialtiesRes.data[0].specialtyId,
        }));
      }
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
      alert("Lỗi tải dữ liệu: " + (err.message || "Kiểm tra kết nối API."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // --- FORM HANDLERS ---
  const handleOpenModal = (care = null) => {
    if (care) {
      // Chuyển đổi từ DTO đầy đủ sang form data input (chỉ cần ID)
      setFormData({
        clinicCareId: care.clinicCareId,
        clinicId: care.clinic.clinicId, // Lấy ID từ object lồng
        specialtyId: care.specialty.specialtyId, // Lấy ID từ object lồng
        name: care.name,
        description: care.description,
        price: care.price,
        active: care.active,
      });
      setIsEditing(true);
    } else {
      // Reset form và set giá trị mặc định cho dropdown
      setFormData({
        ...initialFormState,
        clinicId: clinics[0]?.clinicId || "",
        specialtyId: specialties[0]?.specialtyId || "",
      });
      setIsEditing(false);
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Đảm bảo Price là số dương
    if (formData.price <= 0) {
      alert("Giá dịch vụ phải là số dương.");
      return;
    }

    // Payload cần gửi (chỉ dùng ID và các trường thông tin)
    const payload = {
      clinicCareId: formData.clinicCareId, // Sẽ là 0 nếu tạo mới
      clinicId: parseInt(formData.clinicId),
      specialtyId: parseInt(formData.specialtyId),
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      active: formData.active,
    };

    try {
      if (isEditing) {
        // API update cần ID trong path
        await ClinicCareService.update(payload.clinicCareId, payload);
      } else {
        await ClinicCareService.create(payload);
      }
      setIsOpen(false);
      fetchAllData(); // Refresh data
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Quản lý Dịch vụ Y tế
        </h2>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Thêm mới
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Đang tải dữ liệu...
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-6 py-3">Tên Dịch vụ</th>
                <th className="px-6 py-3">Phòng khám</th>
                <th className="px-6 py-3">Chuyên khoa</th>
                <th className="px-6 py-3">Giá</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {cares.map((care) => (
                <tr
                  key={care.clinicCareId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">{care.clinicCareId}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {care.name}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {care.clinic?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {care.specialty?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    {formatCurrency(care.price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        care.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {care.active ? "Hoạt động" : "Dừng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOpenModal(care)}
                      className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
              {cares.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Chưa có dữ liệu dịch vụ y tế nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Sửa thông tin Dịch vụ" : "Thêm Dịch vụ mới"}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Chọn Phòng khám */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Chọn Phòng khám
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.clinicId}
                    onChange={(e) =>
                      setFormData({ ...formData, clinicId: e.target.value })
                    }
                    required
                    disabled={isEditing} // Không cho đổi phòng khám khi sửa
                  >
                    {clinics.map((clinic) => (
                      <option key={clinic.clinicId} value={clinic.clinicId}>
                        {clinic.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chọn Chuyên khoa */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Chọn Chuyên khoa
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.specialtyId}
                    onChange={(e) =>
                      setFormData({ ...formData, specialtyId: e.target.value })
                    }
                    required
                  >
                    {specialties.map((specialty) => (
                      <option
                        key={specialty.specialtyId}
                        value={specialty.specialtyId}
                      >
                        {specialty.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tên dịch vụ */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Tên Dịch vụ
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Mô tả & Giá */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Giá */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Giá (VND)
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                {/* Mô tả chi tiết */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Mô tả chi tiết
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-20 resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Toggle Switch (Chỉ hiện khi Edit) */}
                {isEditing && (
                  <div className="flex items-center mt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={formData.active}
                        onChange={(e) =>
                          setFormData({ ...formData, active: e.target.checked })
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        Đang hoạt động
                      </span>
                    </label>
                  </div>
                )}

                {/* Modal Footer Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
