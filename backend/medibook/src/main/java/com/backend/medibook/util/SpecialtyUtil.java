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
        var specialty=Specialty.builder().name(specialtyDTO.getName()).description(specialtyDTO.getDescription()).active(specialtyDTO.isActive());
        if(specialtyDTO.getSpecialtyId()>0){
            specialty.specialtyId(specialtyDTO.getSpecialtyId());
        }
        return specialty.build();
    }
}
