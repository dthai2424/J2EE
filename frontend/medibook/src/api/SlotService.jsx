import axiosClient from "./axiosClient";

export const SlotService = {
  getMorningSlots: () => {
    return axiosClient.get("/slot/morning");
  },

  getAfternoonSlots: () => {
    return axiosClient.get("/slot/afternoon");
  },

  getAllSlots: () => {
    return axiosClient.get("/slot/all");
  },

  create: (data) => {
    return axiosClient.post("/slot/create", data);
  },
  update: (data) => {
    return axiosClient.put("/slot/update", data);
  },
  // ---------------------------------
};
