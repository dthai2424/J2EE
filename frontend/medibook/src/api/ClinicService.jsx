import axiosClient from "./axiosClient";

export const ClinicService = {
  // Lấy tất cả phòng khám
  getAll: () => {
    return axiosClient.get("/clinic/all");
  },

  // Tìm kiếm theo tên
  searchByName: (name) => {
    return axiosClient.get(`/clinic/search/name`, { params: { name } });
  },

  // Tìm kiếm theo địa chỉ
  searchByAddress: (address) => {
    return axiosClient.get(`/clinic/search/address`, { params: { address } });
  },
};
