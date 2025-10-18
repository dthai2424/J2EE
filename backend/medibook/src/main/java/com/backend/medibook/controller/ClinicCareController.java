package com.backend.medibook.controller;

import com.backend.medibook.dto.ClinicCareDTO;
import com.backend.medibook.service.ClinicCareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic-care")
public class ClinicCareController {

    @Autowired
    private ClinicCareService clinicCareService;

    /**
     * Tạo một dịch vụ (care) mới cho phòng khám.
     * Cần clinicId và specialtyId trong DTO.
     */
    @PostMapping("/create")
    public ResponseEntity<ClinicCareDTO> createClinicCare(@RequestBody ClinicCareDTO clinicCareDTO) {
        // GlobalExceptionHandler sẽ bắt các lỗi 404 (Clinic/Specialty) và 400 (Validation)
        ClinicCareDTO createdCare = clinicCareService.create(clinicCareDTO);
        return ResponseEntity.ok(createdCare);
    }

    /**
     * Cập nhật dịch vụ.
     * Dựa theo service impl,
     * chỉ cho update name, description, price.
     * Service cũng yêu cầu clinicId và specialtyId trong DTO để validation.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ClinicCareDTO> updateClinicCare(
            @PathVariable("id") Integer clinicCareId,
            @RequestBody ClinicCareDTO clinicCareDTO) {

        // GlobalExceptionHandler sẽ bắt các lỗi 404 (Care/Clinic/Specialty) và 400 (Validation)
        ClinicCareDTO updatedCare = clinicCareService.update(clinicCareId, clinicCareDTO);
        return ResponseEntity.ok(updatedCare);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicCareDTO> getClinicCareById(@PathVariable("id") Integer clinicCareId) {
        // GlobalExceptionHandler sẽ bắt lỗi 404 (Care not found)
        ClinicCareDTO care = clinicCareService.getById(clinicCareId);
        return ResponseEntity.ok(care);
    }

    /**
     * Lấy tất cả dịch vụ của một phòng khám.
     */
    @GetMapping("/clinic/{clinicId}")
    public ResponseEntity<List<ClinicCareDTO>> getAllByClinic(
            @PathVariable Integer clinicId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Clinic not found)
        List<ClinicCareDTO> cares = clinicCareService.getAllByClinic(clinicId, active);
        return ResponseEntity.ok(cares);
    }

    /**
     * Lấy tất cả dịch vụ của một phòng khám VÀ một chuyên khoa.
     */
    @GetMapping("/clinic/{clinicId}/specialty/{specialtyId}")
    public ResponseEntity<List<ClinicCareDTO>> getAllByClinicAndSpecialty(
            @PathVariable Integer clinicId,
            @PathVariable Integer specialtyId,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Clinic/Specialty not found)
        List<ClinicCareDTO> cares = clinicCareService.getAllByClinicAndSpecialty(clinicId, specialtyId, active);
        return ResponseEntity.ok(cares);
    }

    /**
     * Tìm dịch vụ theo tên trong một phòng khám.
     */
    @GetMapping("/clinic/{clinicId}/search/name")
    public ResponseEntity<List<ClinicCareDTO>> getByNameInClinic(
            @PathVariable Integer clinicId,
            @RequestParam String name,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Clinic not found)
        List<ClinicCareDTO> cares = clinicCareService.getByNameInClinic(clinicId, name, active);
        return ResponseEntity.ok(cares);
    }

    /**
     * Tìm dịch vụ theo mô tả trong một phòng khám.
     */
    @GetMapping("/clinic/{clinicId}/search/description")
    public ResponseEntity<List<ClinicCareDTO>> getByDescriptionInClinic(
            @PathVariable Integer clinicId,
            @RequestParam String description,
            @RequestParam(defaultValue = "true") boolean active) {

        // GlobalExceptionHandler sẽ bắt lỗi 404 (Clinic not found)
        List<ClinicCareDTO> cares = clinicCareService.getByDescriptionInClinic(clinicId, description, active);
        return ResponseEntity.ok(cares);
    }
}