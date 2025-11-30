package com.backend.medibook.service;

import com.backend.medibook.dto.AppointmentDTO;
import java.time.LocalDate;
import java.util.List;

public interface AppointmentService {

    // ===== CHỨC NĂNG CHO BỆNH NHÂN =====
    List<AppointmentDTO> findAllAppointments();
    AppointmentDTO create(AppointmentDTO appointmentDTO);

    /**
     * Bệnh nhân hủy một cuộc hẹn. Có các quy tắc về thời gian.
     */
    AppointmentDTO cancelAppointmentAsPatient(Integer appointmentId, Integer userId);


    // ===== CHỨC NĂNG CHO ADMIN/PHÒNG KHÁM =====

    /**
     * Admin/Lễ tân xác nhận một cuộc hẹn. (PENDING -> CONFIRMED).
     */
    AppointmentDTO confirmAppointment(Integer appointmentId);

    /**
     * Admin/Lễ tân đánh dấu một cuộc hẹn đã hoàn thành. (CONFIRMED -> COMPLETED).
     */
    AppointmentDTO completeAppointment(Integer appointmentId);

    /**
     * Admin/Lễ tân hủy một cuộc hẹn (ví dụ: bác sĩ có việc đột xuất).
     */
    AppointmentDTO cancelAppointmentAsAdmin(Integer appointmentId);


    // ===== CÁC CHỨC NĂNG TÌM KIẾM =====

    /**
     * Lấy thông tin chi tiết của một cuộc hẹn.
     */
    AppointmentDTO getAppointmentById(Integer appointmentId);

    /**
     * Lấy lịch sử hẹn của một bệnh nhân.
     */
    List<AppointmentDTO> findAppointmentsByUser(Integer userId,boolean active);

    /**
     * Xem tất cả lịch hẹn của một bác sĩ trong một ngày.
     */
    List<AppointmentDTO> findAppointmentsByDoctorAndDate(Integer doctorId, LocalDate date);
}