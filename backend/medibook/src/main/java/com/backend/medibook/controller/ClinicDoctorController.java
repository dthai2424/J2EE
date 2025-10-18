package com.backend.medibook.controller;

import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.service.ClinicDoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic-doctor")
public class ClinicDoctorController {

    @Autowired
    private ClinicDoctorService clinicDoctorService;

    /**
     * Phân công một bác sĩ vào một phòng khám với một chuyên khoa cụ thể.
     */
    @PostMapping("/create")
    public ResponseEntity<ClinicDoctorDTO> createClinicDoctor(@RequestBody ClinicDoctorDTO clinicDoctorDTO) {
        // GlobalExceptionHandler sẽ bắt các lỗi 404 (Clinic/Doctor/Specialty)
        // và 409 (Already Exist)
        ClinicDoctorDTO createdLink = clinicDoctorService.create(clinicDoctorDTO);
        return ResponseEntity.ok(createdLink);
    }

    /**
     * Cập nhật một phân công.
     * Dựa theo logic service:
     * - Nếu isChangeStatus = true: Chỉ kích hoạt lại (set active=true)
     * - Nếu isChangeStatus = false: Hủy phân công cũ và tạo phân công mới.
     *
     * @param clinicDoctorDTO DTO chứa ID của phân công cũ (clinicDoctorId)
     * VÀ thông tin mới (clinicId, doctorId, specialtyId).
     * @param isChangeStatus  Cờ xác định logic update.
     */
    @PutMapping("/update")
    public ResponseEntity<ClinicDoctorDTO> updateClinicDoctor(
            @RequestBody ClinicDoctorDTO clinicDoctorDTO,
            @RequestParam boolean isChangeStatus) {

        // GlobalExceptionHandler sẽ xử lý các lỗi 404 và 409
        ClinicDoctorDTO updatedLink = clinicDoctorService.update(clinicDoctorDTO, isChangeStatus);
        return ResponseEntity.ok(updatedLink);
    }

    // === CÁC ENDPOINT TÌM KIẾM ===

    /**
     * Lấy tất cả bác sĩ đang làm việc tại một phòng khám.
     */
    @GetMapping("/clinic/{clinicId}/doctors")
    public ResponseEntity<List<ClinicDoctorDTO>> getAllDoctorsInClinic(
            @PathVariable Integer clinicId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt ClinicNotFoundException (404)
        List<ClinicDoctorDTO> doctors = clinicDoctorService.getAllDoctorsInClinic(clinicId, active);
        return ResponseEntity.ok(doctors);
    }

    /**
     * Lấy tất cả bác sĩ tại phòng khám theo một chuyên khoa cụ thể.
     */
    @GetMapping("/clinic/{clinicId}/specialty/{specialtyId}/doctors")
    public ResponseEntity<List<ClinicDoctorDTO>> getAllDoctorsInClinicBySpecialty(
            @PathVariable Integer clinicId,
            @PathVariable Integer specialtyId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt ClinicNotFoundException (404)
        // và SpecialtyNotFoundException (404)
        List<ClinicDoctorDTO> doctors = clinicDoctorService.getAllDoctorsInClinicBySpecialty(clinicId, specialtyId, active);
        return ResponseEntity.ok(doctors);
    }

    /**
     * Lấy tất cả các phòng khám mà một bác sĩ đang làm việc.
     */
    @GetMapping("/doctor/{doctorId}/clinics")
    public ResponseEntity<List<ClinicDoctorDTO>> getAllClinicsOfDoctor(
            @PathVariable Integer doctorId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt DoctorIdNotFoundException (404)
        List<ClinicDoctorDTO> clinics = clinicDoctorService.getAllClinicsOfDoctor(doctorId, active);
        return ResponseEntity.ok(clinics);
    }
}