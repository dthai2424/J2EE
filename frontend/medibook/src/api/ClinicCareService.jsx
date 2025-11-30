import axiosClient from "./axiosClient";

export const ClinicCareService = {
  getAll: () => {
    return axiosClient.get("/clinic-care/all");
  },

  getAllServicesInClinic: (clinicId) => {
    return axiosClient.get(`/clinic-care/clinic/${clinicId}`);
  },

  create: (data) => {
    return axiosClient.post("/clinic-care/create", data);
  },
  update: (clinicCareId, data) => {
    return axiosClient.put(`/clinic-care/${clinicCareId}`, data);
  },
  // ---------------------------------
};
