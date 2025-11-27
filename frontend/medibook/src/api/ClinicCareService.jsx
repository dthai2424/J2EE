import axiosClient from "./axiosClient";

export const ClinicCareService = {
  getAll: () => {
    return axiosClient.get("/clinic-care/all");
  },
  // Lấy danh sách dịch vụ của một phòng khám
  getAllServicesInClinic: (clinicId) => {
    return axiosClient.get(`/clinic-care/clinic/${clinicId}`);
  },
};
