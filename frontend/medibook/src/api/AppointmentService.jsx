import axiosClient from "./axiosClient";

export const AppointmentService = {
  // Lấy danh sách lịch hẹn theo User ID
  getByUserId: (userId) => {
    return axiosClient.get(`/appointment/user/${userId}`);
  },

  // Tạo cuộc hẹn mới
  create: (appointmentData) => {
    return axiosClient.post("/appointment/create", appointmentData);
  },

  // --- THÊM HÀM NÀY ---
  // Lấy danh sách lịch hẹn của bác sĩ trong một ngày cụ thể
  getAppointmentsByDoctorAndDate: (doctorId, date) => {
    // date format: YYYY-MM-DD
    return axiosClient.get(`/appointment/doctor/${doctorId}/date`, {
      params: { date },
    });
  },
};
