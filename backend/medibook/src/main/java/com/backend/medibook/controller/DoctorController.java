package com.backend.medibook.controller;

import com.backend.medibook.dto.DoctorDTO;
import com.backend.medibook.dto.UserDTO; // Cần import UserDTO
import com.backend.medibook.dto.DoctorRegistrationRequestDTO; // Import DTO hỗ trợ
import com.backend.medibook.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    /**
     * Endpoint để tạo một bác sĩ mới.
     * Bao gồm việc tạo tài khoản User (với Role DOCTOR)
     * và tạo hồ sơ Doctor.
     */
    @PostMapping("/create")
    public ResponseEntity<DoctorDTO> createDoctor(@RequestBody DoctorRegistrationRequestDTO request) {

        // 1. Lấy thông tin User từ request
        UserDTO userDTO = request.getUserDTO();

        // 2. Lấy thông tin Doctor từ request và build thành DoctorDTO
        // (Service chỉ cần licenseNumber và careerStartDate từ DTO này)
        DoctorDTO doctorInfo = DoctorDTO.builder()
                .licenseNumber(request.getLicenseNumber())
                .careerStartDate(request.getCareerStartDate())
                .build();

        // 3. Gọi service
        // GlobalExceptionHandler sẽ xử lý mọi lỗi (400, 404, 409)
        DoctorDTO newDoctor = doctorService.create(userDTO, request.getPassword(), doctorInfo);
        return ResponseEntity.ok(newDoctor);
    }

    /**
     * Cập nhật thông tin nghề nghiệp của bác sĩ (license, career start date).
     * Service sẽ lấy doctorId từ DTO.
     */
    @PutMapping("/update")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody DoctorDTO doctorDTO) {
        // GlobalExceptionHandler sẽ bắt DoctorIdNotFoundException (404)
        // và DoctorLicenseInvalidException (400)
        DoctorDTO updatedDoctor = doctorService.update(doctorDTO);
        return ResponseEntity.ok(updatedDoctor);
    }

    // === LẤY THÔNG TIN BÁC SĨ ===

    @GetMapping("/all")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors(
            @RequestParam(defaultValue = "true") boolean active) {
        List<DoctorDTO> doctors = doctorService.getAll(active);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable("id") Integer id) {
        // GlobalExceptionHandler sẽ bắt DoctorIdNotFoundException (404)
        DoctorDTO doctor = doctorService.getByID(id);
        return ResponseEntity.ok(doctor);
    }

    // === TÌM KIẾM BÁC SĨ ===

    @GetMapping("/search/email")
    public ResponseEntity<List<DoctorDTO>> searchDoctorByEmail(
            @RequestParam String email,
            @RequestParam(defaultValue = "true") boolean active) {
        List<DoctorDTO> doctors = doctorService.getByEmailContaining(email, active);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/search/phone")
    public ResponseEntity<List<DoctorDTO>> searchDoctorByPhone(
            @RequestParam String phone,
            @RequestParam(defaultValue = "true") boolean active) {
        List<DoctorDTO> doctors = doctorService.getByPhoneContaining(phone, active);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/search/license")
    public ResponseEntity<List<DoctorDTO>> searchDoctorByLicense(
            @RequestParam String licenseNumber,
            @RequestParam(defaultValue = "true") boolean active) {
        List<DoctorDTO> doctors = doctorService.getByLicenseNumberContaining(licenseNumber, active);
        return ResponseEntity.ok(doctors);
    }

    /**
     * Tìm bác sĩ theo khoảng thời gian bắt đầu sự nghiệp.
     * Định dạng ISO: YYYY-MM-DDTHH:mm:ss (ví dụ: 2005-01-01T00:00:00)
     */
    @GetMapping("/search/career-date")
    public ResponseEntity<List<DoctorDTO>> searchDoctorByCareerDate(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "true") boolean active) {
        List<DoctorDTO> doctors = doctorService.getByCareerStartBetween(startDate, endDate, active);
        return ResponseEntity.ok(doctors);
    }
}