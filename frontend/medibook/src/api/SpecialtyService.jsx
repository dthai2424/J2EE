import axiosClient from "./axiosClient";

export const SpecialtyService = {
  getAll: (active = true) => {
    return axiosClient.get("/specialty/all", { params: { active } });
  },
  create: (data) => {
    return axiosClient.post("/specialty/create", data);
  },
  update: (data) => {
    return axiosClient.put("/specialty/update", data);
  },
};
