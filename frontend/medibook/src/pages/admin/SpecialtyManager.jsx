import React, { useEffect, useState } from "react";
import { SpecialtyService } from "../../api/SpecialtyService"; // Đảm bảo import đúng

export function SpecialtyManager() {
  const [specialties, setSpecialties] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchSpecialties = async () => {
    try {
      const res = await SpecialtyService.getAll(true); // Lấy active
      setSpecialties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await SpecialtyService.update(formData);
      } else {
        await SpecialtyService.create(formData);
      }
      setIsOpen(false);
      fetchSpecialties();
      resetForm();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || "Có lỗi xảy ra"));
    }
  };

  const openEdit = (spec) => {
    setFormData(spec);
    setIsEditing(true);
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", active: true });
    setIsEditing(false);
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Quản lý Chuyên khoa
        </h2>
        <button
          onClick={() => {
            resetForm();
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Thêm mới
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Tên chuyên khoa</th>
              <th className="px-6 py-3">Mô tả</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {specialties.map((spec) => (
              <tr
                key={spec.specialtyId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{spec.specialtyId}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {spec.name}
                </td>
                <td
                  className="px-6 py-4 max-w-xs truncate"
                  title={spec.description}
                >
                  {spec.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      spec.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {spec.active ? "Hoạt động" : "Dừng"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEdit(spec)}
                    className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
            {specialties.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  Chưa có dữ liệu chuyên khoa.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Cập nhật Chuyên khoa" : "Thêm Chuyên khoa"}
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Tên chuyên khoa
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Mô tả
                  </label>
                  <textarea
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24 resize-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

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
