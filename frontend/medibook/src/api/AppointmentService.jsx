import axiosClient from "./axiosClient";

export const AppointmentService = {
  // Lấy danh sách lịch hẹn theo User ID
  getByUserId: (userId) => {
    return axiosClient.get(`/appointment/user/${userId}`);
  },
};
