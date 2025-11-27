import axiosClient from "./axiosClient";

export const DoctorService = {
  // Lấy danh sách bác sĩ (Backend: /api/doctor/all?active=true)
  getAll: (active = true) => {
    return axiosClient.get("/doctor/all", { params: { active } });
  },

  // Tạo bác sĩ mới (bao gồm cả User)
  // Backend nhận: DoctorRegistrationRequestDTO
  create: (data) => {
    return axiosClient.post("/doctor/create", data);
  },

  // Cập nhật thông tin chuyên môn bác sĩ
  update: (data) => {
    return axiosClient.put("/doctor/update", data);
  },

  getById: (id) => {
    return axiosClient.get(`/doctor/${id}`);
  },
};
