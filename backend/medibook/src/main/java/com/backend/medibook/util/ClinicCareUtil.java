package com.backend.medibook.util;

import com.backend.medibook.dto.ClinicCareDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicCare;
import com.backend.medibook.entity.Specialty;
import org.springframework.stereotype.Component;

@Component
public class ClinicCareUtil {
    public ClinicCare modelToEntity(ClinicCareDTO clinicCareDTO, Clinic clinic, Specialty specialty) {
        return ClinicCare.builder()
                .clinicCareId(clinicCareDTO.getClinicCareId()).clinic(clinic)
                .specialty(specialty)
                .name(clinicCareDTO.getName())
                .description(clinicCareDTO.getDescription())
                .price(clinicCareDTO.getPrice())
                .active(clinicCareDTO.isActive())
                .build();
    }
    public ClinicCareDTO entityToModel(ClinicCare clinicCare) {
        return ClinicCareDTO.builder()
                .clinicCareId(clinicCare.getClinicCareId())
                .clinicId(clinicCare.getClinic().getClinicId())
                .specialtyId(clinicCare.getSpecialty().getSpecialtyId())
                .name(clinicCare.getName())
                .description(clinicCare.getDescription())
                .price(clinicCare.getPrice())
                .active(clinicCare.isActive())
                .build();
    }
    public boolean validateName(String input) {

        if (input == null || input.trim().isEmpty()) {
            return false;
        }
        String regex = "^[a-zA-Z0-9._-]+$";
        return input.matches(regex);
    }
    public boolean validatePrice(long price){
        return price>0;
    }
}
