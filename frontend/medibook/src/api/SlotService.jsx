import axiosClient from "./axiosClient";

export const SlotService = {
  // Lấy các slot buổi sáng (ví dụ: 07:00 - 12:00)
  getMorningSlots: () => {
    return axiosClient.get("/slot/morning");
  },

  // Lấy các slot buổi chiều (ví dụ: 13:00 - 17:00)
  getAfternoonSlots: () => {
    return axiosClient.get("/slot/afternoon");
  },

  // Lấy tất cả slot (dự phòng)
  getAllSlots: () => {
    return axiosClient.get("/slot/all");
  },
};
