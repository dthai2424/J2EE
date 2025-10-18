package com.backend.medibook.controller;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.exception.ClinicNameInvalidException;
import com.backend.medibook.exception.ClinicNotFoundException;
import com.backend.medibook.exception.ClinicPhoneInvalidException;
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

        try {
            List<ClinicDTO> allClinics = clinicService.getAll();
            return ResponseEntity.ok(allClinics);
        } catch (Exception e) {
//            Mất kết nối DB
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createClinic(@RequestBody ClinicDTO clinicDTO) {
        try {
            ClinicDTO createdClinic = clinicService.create(clinicDTO);
            return ResponseEntity.ok(createdClinic); // Trả về 200 OK
        } catch (ClinicNameInvalidException | ClinicPhoneInvalidException e) {
            // Người dùng nhập sai (400 Bad Request)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            // Lỗi server chung
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã có lỗi xảy ra ở server: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateClinic(@RequestBody ClinicDTO clinicDTO) {
        try {
            ClinicDTO updatedClinic = clinicService.update(clinicDTO);
            return ResponseEntity.ok(updatedClinic);
        } catch (ClinicNotFoundException e) {
            // Lỗi không tìm thấy (404 Not Found)
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (ClinicNameInvalidException | ClinicPhoneInvalidException e) {
            // Lỗi do người dùng nhập sai (400 Bad Request)
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            // Lỗi server chung
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã có lỗi xảy ra ở server: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getClinicById(@PathVariable Integer id) {
        try {
            ClinicDTO clinicDTO = clinicService.getById(id);
            return ResponseEntity.ok(clinicDTO);
        } catch (ClinicNotFoundException e) {
            // Lỗi không tìm thấy (404 Not Found)
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Đã có lỗi xảy ra ở server: " + e.getMessage());
        }
    }

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