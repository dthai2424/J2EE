package com.backend.medibook.controller;

import com.backend.medibook.dto.SpecialtyDTO;
import com.backend.medibook.service.SpecialtyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/api/specialty")
public class SpecialtyController {
    @Autowired
    SpecialtyService specialtyService;

    @PostMapping("/create")
    private ResponseEntity<SpecialtyDTO> createSpecialty(SpecialtyDTO specialtyDTO) {
        SpecialtyDTO createdSpecialty = specialtyService.create(specialtyDTO);
        return ResponseEntity.ok(createdSpecialty);
    }
    @PutMapping("/update")
    private ResponseEntity<SpecialtyDTO> updateSpecialty(SpecialtyDTO specialtyDTO) {
        SpecialtyDTO updatedSpecialty = specialtyService.update(specialtyDTO);
        return ResponseEntity.ok(updatedSpecialty);
    }


}
