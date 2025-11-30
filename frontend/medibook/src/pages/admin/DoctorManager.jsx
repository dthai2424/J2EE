import React, { useEffect, useState } from "react";
import { DoctorService } from "../../api/DoctorService";

// Helper để format date cho input type="date" (YYYY-MM-DD)
const formatDateForInput = (date) => {
  // 1. Kiểm tra nếu giá trị ban đầu là null/undefined
  if (!date) return "";

  // 2. Tạo đối tượng Date an toàn
  const d = new Date(date);

  // 3. Kiểm tra xem đối tượng Date có hợp lệ không (getTime() trả về NaN nếu không hợp lệ)
  if (isNaN(d.getTime())) {
    return "";
  }

  // 4. Format sang YYYY-MM-DD
  return d.toISOString().split("T")[0];
};

export function DoctorManager() {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form data cho Create (DTO phức tạp)
  const [createData, setCreateData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    careerStartDate: new Date(),
  });

  // Form data cho Update (DTO đơn giản)
  const [updateData, setUpdateData] = useState({
    doctorId: null,
    licenseNumber: "",
    careerStartDate: new Date(),
    active: true,
  });

  const fetchDoctors = async () => {
    try {
      const res = await DoctorService.getAll(true);
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const payload = {
      userDTO: {
        username: createData.username,
        name: createData.name,
        email: createData.email,
        phoneNumber: createData.phoneNumber,
      },
      password: createData.password,
      licenseNumber: createData.licenseNumber,
      // Chuyển Date sang ISO string (backend java.time.LocalDateTime)
      careerStartDate: new Date(createData.careerStartDate).toISOString(),
    };

    try {
      await DoctorService.create(payload);
      alert("Tạo bác sĩ thành công!");
      setIsOpen(false);
      fetchDoctors();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const payload = {
      doctorId: updateData.doctorId,
      licenseNumber: updateData.licenseNumber,
      careerStartDate: new Date(updateData.careerStartDate).toISOString(),
      active: updateData.active,
    };
    try {
      await DoctorService.update(payload);
      alert("Cập nhật thành công!");
      setIsOpen(false);
      fetchDoctors();
    } catch (error) {
      alert("Lỗi: " + (error.response?.data || error.message));
    }
  };

  const openCreate = () => {
    setCreateData({
      username: "",
      password: "",
      name: "",
      email: "",
      phoneNumber: "",
      licenseNumber: "",
      careerStartDate: new Date(),
    });
    setIsEditing(false);
    setIsOpen(true);
  };

  const openEdit = (doc) => {
    setUpdateData({
      doctorId: doc.doctorId,
      licenseNumber: doc.licenseNumber,
      // Khởi tạo an toàn: Nếu careerStartDate là null/invalid, dùng new Date() thay thế
      careerStartDate: doc.careerStartDate
        ? new Date(doc.careerStartDate)
        : new Date(),
      active: doc.active,
    });
    setIsEditing(true);
    setIsOpen(true);
  };

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Bác sĩ</h2>
        <button
          onClick={openCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Thêm Bác sĩ mới
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Tên Bác sĩ</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Giấy phép</th>
              <th className="px-6 py-3">Kinh nghiệm từ</th>
              <th className="px-6 py-3">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr
                key={doc.doctorId}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{doc.doctorId}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {doc.user?.name}
                </td>
                <td className="px-6 py-4">{doc.user?.username}</td>
                <td className="px-6 py-4">{doc.licenseNumber}</td>
                <td className="px-6 py-4">
                  {new Date(doc.careerStartDate).getFullYear()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEdit(doc)}
                    className="font-medium text-blue-600 hover:underline hover:text-blue-800"
                  >
                    Sửa
                  </button>
                </td>
              </tr>
            ))}
            {doctors.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Chưa có dữ liệu bác sĩ.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {isEditing
                  ? "Cập nhật thông tin nghề nghiệp"
                  : "Đăng ký Bác sĩ mới"}
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
              {isEditing ? (
                // FORM UPDATE
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Số giấy phép
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={updateData.licenseNumber}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          licenseNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Ngày bắt đầu hành nghề
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      // SỬ DỤNG HELPER ĐÃ FIX
                      value={formatDateForInput(updateData.careerStartDate)}
                      onChange={(e) =>
                        setUpdateData({
                          ...updateData,
                          careerStartDate: new Date(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Cập nhật
                    </button>
                  </div>
                </form>
              ) : (
                // FORM CREATE (User info + Doctor info)
                <form
                  onSubmit={handleCreate}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="md:col-span-2 font-bold text-gray-700 border-b pb-2">
                    Thông tin tài khoản
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Username
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.username}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          username: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <input
                      type="password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.password}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Họ tên
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.name}
                      onChange={(e) =>
                        setCreateData({ ...createData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Email
                    </label>
                    <input
                      type="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.email}
                      onChange={(e) =>
                        setCreateData({ ...createData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      SĐT
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.phoneNumber}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2 font-bold text-gray-700 border-b pb-2 mt-4">
                    Thông tin nghề nghiệp
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Số giấy phép hành nghề
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={createData.licenseNumber}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          licenseNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Ngày bắt đầu
                    </label>
                    <input
                      type="date"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      // SỬ DỤNG HELPER ĐÃ FIX
                      value={formatDateForInput(createData.careerStartDate)}
                      onChange={(e) =>
                        setCreateData({
                          ...createData,
                          careerStartDate: new Date(e.target.value),
                        })
                      }
                      required
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                      Tạo mới
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
