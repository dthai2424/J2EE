import axiosClient from "./axiosClient";

export const ClinicDoctorService = {
  // Lấy danh sách bác sĩ của một phòng khám
  getAllDoctorsInClinic: (clinicId) => {
    return axiosClient.get(`/clinic-doctor/clinic/${clinicId}/doctors`);
  },
};
