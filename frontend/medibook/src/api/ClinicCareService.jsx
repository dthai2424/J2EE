import axiosClient from "./axiosClient";

export const ClinicCareService = {
  // Lấy danh sách dịch vụ của một phòng khám
  getAllServicesInClinic: (clinicId) => {
    return axiosClient.get(`/clinic-care/clinic/${clinicId}`);
  },
};
