package com.backend.medibook.controller;

import com.backend.medibook.dto.ClinicDTO;
// Import các exception này không còn cần thiết nữa nếu bạn không ném chúng ra
// import com.backend.medibook.exception.ClinicNameInvalidException;
// import com.backend.medibook.exception.ClinicNotFoundException;
// import com.backend.medibook.exception.ClinicPhoneInvalidException;
import com.backend.medibook.service.ClinicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinic")
public class ClinicController {
    @Autowired
    private ClinicService clinicService;

    @GetMapping("/all")
    public ResponseEntity<List<ClinicDTO>> getAllActiveClinic() {
// Nếu service có lỗi (ví dụ: mất kết nối DB),
        // GlobalExceptionHandler sẽ tự động bắt Exception và trả về 500.
        List<ClinicDTO> allClinics = clinicService.getAll();
        return ResponseEntity.ok(allClinics);
    }

    @PostMapping("/create")
    public ResponseEntity<ClinicDTO> createClinic(@RequestBody ClinicDTO clinicDTO) {

        // Nếu service ném ClinicNameInvalidException hoặc ClinicPhoneInvalidException,
        // GlobalExceptionHandler sẽ tự động bắt và trả về 400 Bad Request.
        ClinicDTO createdClinic = clinicService.create(clinicDTO);
        return ResponseEntity.ok(createdClinic); // Trả về 200 OK
    }

    @PutMapping("/update")
    public ResponseEntity<ClinicDTO> updateClinic(@RequestBody ClinicDTO clinicDTO) {

        // GlobalExceptionHandler sẽ tự động bắt:
        // - ClinicNotFoundException (404)
        // - ClinicNameInvalidException (400)
        // - ClinicPhoneInvalidException (400)
        ClinicDTO updatedClinic = clinicService.update(clinicDTO);
        return ResponseEntity.ok(updatedClinic);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClinicDTO> getClinicById(@PathVariable Integer id) {

        // Nếu service ném ClinicNotFoundException,
        // GlobalExceptionHandler sẽ tự động bắt và trả về 404 Not Found.
        ClinicDTO clinicDTO = clinicService.getById(id);
        return ResponseEntity.ok(clinicDTO);
    }

    // =================================================================
    // CÁC HÀM TÌM KIẾM NÀY VỐN ĐÃ TỐT (KHÔNG CÓ TRY-CATCH)
    // NÊN KHÔNG CẦN THAY ĐỔI
    // =================================================================

    @GetMapping("/search/name")
    public ResponseEntity<List<ClinicDTO>> getClinicByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "true") boolean active) {

        List<ClinicDTO> clinicDTOS = clinicService.getByNameContaining(name, active);
        return ResponseEntity.ok(clinicDTOS);
    }

    @GetMapping("/search/email")
    public ResponseEntity<List<ClinicDTO>> getClinicByEmail(
            @RequestParam String email,
            @RequestParam(defaultValue = "true") boolean active) {

        List<ClinicDTO> clinicDTOS = clinicService.getByEmailContaining(email, active);
        return ResponseEntity.ok(clinicDTOS);
    }

    @GetMapping("/search/phone")
    public ResponseEntity<List<ClinicDTO>> getClinicByPhone(
            @RequestParam String phone,
            @RequestParam(defaultValue = "true") boolean active) {

        List<ClinicDTO> clinicDTOS = clinicService.getByPhoneContaining(phone, active);
        return ResponseEntity.ok(clinicDTOS);
    }

    @GetMapping("/search/address")
    public ResponseEntity<List<ClinicDTO>> getClinicByAddress(
            @RequestParam String address,
            @RequestParam(defaultValue = "true") boolean active) {

        List<ClinicDTO> clinicDTOS = clinicService.getByAddressContaining(address, active);
        return ResponseEntity.ok(clinicDTOS);
    }
}