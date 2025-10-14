package com.backend.medibook.service;

import com.backend.medibook.dto.SpecialtyDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SpecialtyService {
    SpecialtyDTO create(SpecialtyDTO specialtyDTO);

    SpecialtyDTO update(SpecialtyDTO specialtyDTO);

    SpecialtyDTO getByID(Integer specialtyId);

    List<SpecialtyDTO> getAllActive(boolean active);

    List<SpecialtyDTO> getByNameContain(String name,boolean active);

    List<SpecialtyDTO> getByDescriptionContain(String description,boolean active);
}
