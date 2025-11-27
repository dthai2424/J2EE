import axiosClient from "./axiosClient";

export const ClinicService = {
  getAll: () => {
    return axiosClient.get("/clinic/all");
  },
  searchByName: (name) => {
    return axiosClient.get(`/clinic/search/name`, { params: { name } });
  },
  searchByAddress: (address) => {
    return axiosClient.get(`/clinic/search/address`, { params: { address } });
  },
  // --- BỔ SUNG ---
  create: (data) => {
    return axiosClient.post("/clinic/create", data);
  },
  update: (data) => {
    return axiosClient.put("/clinic/update", data);
  },
};
