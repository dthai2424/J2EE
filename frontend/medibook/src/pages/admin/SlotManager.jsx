import React, { useEffect, useState } from "react";
import { SlotService } from "../../api/SlotService";
import { Clock } from "lucide-react";

export function SlotManager() {
  const [slots, setSlots] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const initialFormState = {
    slotId: 0,
    startTime: "08:00",
    endTime: "08:30",
    active: true,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);

  // --- FETCH DATA ---
  const fetchSlots = async () => {
    setLoading(true);
    try {
      // Dùng getAllSlots để lấy tất cả slot active/inactive
      const res = await SlotService.getAllSlots();
      setSlots(res.data);
    } catch (err) {
      console.error("Lỗi tải danh sách Slot:", err);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // --- FORM HANDLERS ---
  const handleOpenModal = (slot = null) => {
    if (slot) {
      setFormData({
        slotId: slot.slotId,
        // Backend trả về chuỗi LocalTime (HH:mm:ss), cắt để hiển thị HH:mm
        startTime: slot.startTime.substring(0, 5),
        endTime: slot.endTime.substring(0, 5),
        active: slot.active,
      });
      setIsEditing(true);
    } else {
      setFormData(initialFormState);
      setIsEditing(false);
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation: End time must be after Start time
    // So sánh chuỗi HH:mm có thể hoạt động nhưng nên chuyển sang phút để chắc chắn
    const startMinutes =
      parseInt(formData.startTime.split(":")[0]) * 60 +
      parseInt(formData.startTime.split(":")[1]);
    const endMinutes =
      parseInt(formData.endTime.split(":")[0]) * 60 +
      parseInt(formData.endTime.split(":")[1]);

    if (endMinutes <= startMinutes) {
      alert("Thời gian kết thúc phải sau thời gian bắt đầu.");
      return;
    }

    // Payload cần gửi (Backend expect HH:mm:ss, nên thêm :00)
    const payload = {
      slotId: formData.slotId,
      startTime: `${formData.startTime}:00`,
      endTime: `${formData.endTime}:00`,
      active: formData.active,
    };

    try {
      if (isEditing) {
        await SlotService.update(payload);
      } else {
        await SlotService.create(payload);
      }
      setIsOpen(false);
      fetchSlots(); // Refresh data
    } catch (error) {
      // SlotInvalidException (400) hoặc lỗi khác
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Quản lý Khung giờ khám (24h Format)
        </h2>
        <button
          onClick={() => handleOpenModal(null)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Thêm Slot mới
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
                <th className="px-6 py-3">Giờ Bắt đầu (HH:MM)</th>
                <th className="px-6 py-3">Giờ Kết thúc (HH:MM)</th>
                <th className="px-6 py-3">Trạng thái</th>
                <th className="px-6 py-3">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((slot) => (
                <tr
                  key={slot.slotId}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-4 py-4">{slot.slotId}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {/* Đảm bảo hiển thị HH:mm */}
                    {slot.startTime.substring(0, 5)}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {/* Đảm bảo hiển thị HH:mm */}
                    {slot.endTime.substring(0, 5)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        slot.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {slot.active ? "Hoạt động" : "Dừng"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleOpenModal(slot)}
                      className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
              {slots.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    Chưa có khung giờ khám nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* --- CUSTOM MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing ? "Cập nhật Khung giờ" : "Thêm Khung giờ mới"}
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
                <div className="grid grid-cols-2 gap-4">
                  {/* Giờ Bắt đầu */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Giờ Bắt đầu (HH:MM)
                    </label>
                    <input
                      type="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      step="1800" // Bước nhảy 30 phút (1800 giây)
                      required
                    />
                  </div>

                  {/* Giờ Kết thúc */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Giờ Kết thúc (HH:MM)
                    </label>
                    <input
                      type="time"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      step="1800" // Bước nhảy 30 phút (1800 giây)
                      required
                    />
                  </div>
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
