package com.backend.medibook.controller;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.service.AppointmentService;
import com.backend.medibook.service.AppointmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {

    @Autowired
    private AppointmentServiceImpl appointmentService;

    // === CHỨC NĂNG CHO BỆNH NHÂN ===

    /**
     * Bệnh nhân tạo một cuộc hẹn mới.
     * DTO cần chứa: patientId, clinicDoctorId, clinicCareId, slotId, appointmentDate
     */
    @PostMapping("/create")
    public ResponseEntity<AppointmentDTO> createAppointment(@RequestBody AppointmentDTO appointmentDTO) {
        // GlobalExceptionHandler sẽ bắt các lỗi 404 (Không tìm thấy User/Doctor/Care/Slot)
        // và 400 (Ngày không hợp lệ) hoặc 409 (Đã tồn tại)
        AppointmentDTO newAppointment = appointmentService.create(appointmentDTO);
        return ResponseEntity.ok(newAppointment);
    }

    /**
     * Bệnh nhân hủy cuộc hẹn.
     * Endpoint này yêu cầu cả ID cuộc hẹn và ID của bệnh nhân để xác thực
     * (dựa theo service impl)
     */
    @PutMapping("/cancel/patient/{appointmentId}/user/{userId}")
    public ResponseEntity<AppointmentDTO> cancelAppointmentAsPatient(
            @PathVariable Integer appointmentId,
            @PathVariable Integer userId) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Không tìm thấy)
        // 403 (Không có quyền), 400 (Trạng thái/thời gian không hợp lệ)
        AppointmentDTO cancelledAppointment = appointmentService.cancelAppointmentAsPatient(appointmentId, userId);
        return ResponseEntity.ok(cancelledAppointment);
    }

    // === CHỨC NĂNG CHO ADMIN/LỄ TÂN ===

    /**
     * Admin/Lễ tân xác nhận cuộc hẹn (PENDING -> CONFIRMED).
     */
    @PutMapping("/confirm/{appointmentId}")
    public ResponseEntity<AppointmentDTO> confirmAppointment(@PathVariable Integer appointmentId) {
        // GlobalExceptionHandler sẽ bắt lỗi 404, 400 (Trạng thái không hợp lệ)
        AppointmentDTO confirmedAppointment = appointmentService.confirmAppointment(appointmentId);
        return ResponseEntity.ok(confirmedAppointment);
    }

    /**
     * Admin/Lễ tân hoàn thành cuộc hẹn (CONFIRMED -> COMPLETED).
     */
    @PutMapping("/complete/{appointmentId}")
    public ResponseEntity<AppointmentDTO> completeAppointment(@PathVariable Integer appointmentId) {
        // GlobalExceptionHandler sẽ bắt lỗi 404, 400 (Trạng thái/thời gian không hợp lệ)
        AppointmentDTO completedAppointment = appointmentService.completeAppointment(appointmentId);
        return ResponseEntity.ok(completedAppointment);
    }

    /**
     * Admin/Lễ tân hủy cuộc hẹn (không cần check 24h).
     */
    @PutMapping("/cancel/admin/{appointmentId}")
    public ResponseEntity<AppointmentDTO> cancelAppointmentAsAdmin(@PathVariable Integer appointmentId) {
        // GlobalExceptionHandler sẽ bắt lỗi 404, 400 (Trạng thái không hợp lệ)
        AppointmentDTO cancelledAppointment = appointmentService.cancelAppointmentAsAdmin(appointmentId);
        return ResponseEntity.ok(cancelledAppointment);
    }

    // === CÁC CHỨC NĂNG TÌM KIẾM ===

    @GetMapping("/{appointmentId}")
    public ResponseEntity<AppointmentDTO> getAppointmentById(@PathVariable Integer appointmentId) {
        // GlobalExceptionHandler sẽ bắt lỗi 404
        AppointmentDTO appointment = appointmentService.getAppointmentById(appointmentId);
        return ResponseEntity.ok(appointment);
    }

    /**
     * Lấy lịch sử hẹn của một bệnh nhân.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<AppointmentDTO>> findAppointmentsByUser(
            @PathVariable Integer userId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (User not found)
        System.out.println(userId+"\n\n\n\n\n\n\n\n");
        List<AppointmentDTO> appointments = appointmentService.findAppointmentsByUser(userId, active);
        return ResponseEntity.ok(appointments);
    }

    /**
     * Xem tất cả lịch hẹn của một bác sĩ trong một ngày.
     * Dùng định dạng ISO: YYYY-MM-DD (ví dụ: /api/appointment/doctor/1/date?date=2025-10-20)
     */
    @GetMapping("/doctor/{doctorId}/date")
    public ResponseEntity<List<AppointmentDTO>> findAppointmentsByDoctorAndDate(
            @PathVariable Integer doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Doctor not found)
        List<AppointmentDTO> appointments = appointmentService.findAppointmentsByDoctorAndDate(doctorId, date);
        return ResponseEntity.ok(appointments);
    }
}