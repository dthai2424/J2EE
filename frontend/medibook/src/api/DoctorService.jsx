import axiosClient from "./axiosClient";

export const DoctorService = {
  getAll: (active = true) => {
    return axiosClient.get("/doctor/all", { params: { active } });
  },

  create: (data) => {
    return axiosClient.post("/doctor/create", data);
  },

  update: (data) => {
    return axiosClient.put("/doctor/update", data);
  },

  getById: (id) => {
    return axiosClient.get(`/doctor/${id}`);
  },
};
