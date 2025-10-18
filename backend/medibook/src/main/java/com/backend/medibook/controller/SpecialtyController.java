package com.backend.medibook.controller;

import com.backend.medibook.dto.SpecialtyDTO;
import com.backend.medibook.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Đảm bảo import đầy đủ

import java.util.List; // Import List

@RestController
@RequestMapping ("/api/specialty")
public class SpecialtyController {
    @Autowired
    SpecialtyService specialtyService;

    @PostMapping("/create")
    public ResponseEntity<SpecialtyDTO> createSpecialty(@RequestBody SpecialtyDTO specialtyDTO) {
        // GlobalExceptionHandler sẽ bắt SpecialtyNameInvalidException (400)
        SpecialtyDTO createdSpecialty = specialtyService.create(specialtyDTO);
        return ResponseEntity.ok(createdSpecialty);
    }

    @PutMapping("/update")
    public ResponseEntity<SpecialtyDTO> updateSpecialty(@RequestBody SpecialtyDTO specialtyDTO) {
        // GlobalExceptionHandler sẽ bắt SpecialtyNameInvalidException (400)
        SpecialtyDTO updatedSpecialty = specialtyService.update(specialtyDTO);
        return ResponseEntity.ok(updatedSpecialty);
    }

    // ===== BỔ SUNG CÁC ENDPOINT GET CHO ĐẦY ĐỦ =====

    @GetMapping("/{id}")
    public ResponseEntity<SpecialtyDTO> getSpecialtyById(@PathVariable("id") Integer specialtyId) {
        // GlobalExceptionHandler sẽ bắt SpecialtyNotFoundException (404)
        SpecialtyDTO specialtyDTO = specialtyService.getByID(specialtyId);
        return ResponseEntity.ok(specialtyDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<List<SpecialtyDTO>> getAllActiveSpecialties(
            @RequestParam(defaultValue = "true") boolean active) {
        List<SpecialtyDTO> specialties = specialtyService.getAllActive(active);
        return ResponseEntity.ok(specialties);
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<SpecialtyDTO>> getSpecialtyByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "true") boolean active) {
        List<SpecialtyDTO> specialties = specialtyService.getByNameContain(name, active);
        return ResponseEntity.ok(specialties);
    }

    @GetMapping("/search/description")
    public ResponseEntity<List<SpecialtyDTO>> getSpecialtyByDescription(
            @RequestParam String description,
            @RequestParam(defaultValue = "true") boolean active) {
        List<SpecialtyDTO> specialties = specialtyService.getByDescriptionContain(description, active);
        return ResponseEntity.ok(specialties);
    }
}