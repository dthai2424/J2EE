package com.backend.medibook.util;

import com.backend.medibook.dto.SpecialtyDTO;
import com.backend.medibook.entity.Specialty;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Builder
@Component
public class SpecialtyUtil {
    public SpecialtyDTO entityToModel(Specialty specialty){
        SpecialtyDTO specialtyDTO=SpecialtyDTO.builder().specialtyId(specialty.getSpecialtyId()).name(specialty.getName()).description(specialty.getDescription()).active(specialty.isActive()).build();
        return specialtyDTO;
    }
    public Specialty modelToEntity(SpecialtyDTO specialtyDTO){
        Specialty specialty=Specialty.builder().specialtyId(specialtyDTO.getSpecialtyId()).name(specialtyDTO.getName()).description(specialtyDTO.getDescription()).active(specialtyDTO.isActive()).build();
        return specialty;
    }
}
