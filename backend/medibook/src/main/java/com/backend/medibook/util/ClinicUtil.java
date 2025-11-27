package com.backend.medibook.util;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.entity.Clinic;
import lombok.Builder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Builder
@Component
public class ClinicUtil {
    public boolean validateName(String name){
        return StringUtils.hasText(name);
    }
    public boolean validateEmail(String email){
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
    public boolean validatePhone(String phoneNumber){
        String phoneRegex = "^\\+?[1-9][0-9]{7,14}$";
        return phoneNumber.matches(phoneRegex);
    }
    public boolean validateAddress(String address){
       String addressRegex="^[a-zA-Z0-9 ,.\\-/]{3,100}$";
       return address.matches(addressRegex);
    }
    public ClinicDTO entityToModel(Clinic clinic){
        ClinicDTO clinicDTO=ClinicDTO.builder().clinicId(clinic.getClinicId()).name(clinic.getName()).email(clinic.getEmail()).phoneNumber(clinic.getPhoneNumber()).address(clinic.getAddress()).active(clinic.isActive()).build();
        return clinicDTO;
    }
    public Clinic modelToEntity(ClinicDTO clinicDTO){
        Clinic clinic=Clinic.builder().clinicId(clinicDTO.getClinicId()).name(clinicDTO.getName()).email(clinicDTO.getEmail()).phoneNumber(clinicDTO.getPhoneNumber()).address(clinicDTO.getAddress()).active(clinicDTO.isActive()).build();
        return clinic;
    }
}
