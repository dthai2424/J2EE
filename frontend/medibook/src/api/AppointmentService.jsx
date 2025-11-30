import axiosClient from "./axiosClient";

export const AppointmentService = {
  getByUserId: (userId) => {
    return axiosClient.get(`/appointment/user/${userId}`);
  },
  getAllAppointments: () => {
    return axiosClient.get("/appointment/all");
  },

  create: (appointmentData) => {
    return axiosClient.post("/appointment/create", appointmentData);
  },

  getAppointmentsByDoctorAndDate: (doctorId, date) => {
    return axiosClient.get(`/appointment/doctor/${doctorId}/date`, {
      params: { date },
    });
  },
  confirm: (appointmentId) => {
    return axiosClient.put(`/appointment/confirm/${appointmentId}`);
  },

  complete: (appointmentId) => {
    return axiosClient.put(`/appointment/complete/${appointmentId}`);
  },

  cancelAsAdmin: (appointmentId) => {
    return axiosClient.put(`/appointment/cancel/admin/${appointmentId}`);
  },
};
