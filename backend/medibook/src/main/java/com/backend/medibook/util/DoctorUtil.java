package com.backend.medibook.util;

import com.backend.medibook.dto.DoctorDTO;
import com.backend.medibook.entity.Doctor;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Builder
@Component
public class DoctorUtil {
    @Autowired
    private UserUtil userUtil;

    public DoctorDTO entityToModel(Doctor doctor){
        DoctorDTO doctorDTO = DoctorDTO.builder()
                .doctorId(doctor.getDoctorId())
                .user(userUtil.entityToModel(doctor.getUser()))
                .licenseNumber(doctor.getLicenseNumber())
                .careerStartDate(doctor.getCareerStartDate())
                .active(doctor.isActive())
                .build();
        return doctorDTO;
    }

    public Doctor modelToEntity(DoctorDTO doctorDTO){
        Doctor doctor = Doctor.builder()
                .doctorId(doctorDTO.getDoctorId())
                .user(userUtil.modelToEntity(doctorDTO.getUser()))
                .licenseNumber(doctorDTO.getLicenseNumber())
                .careerStartDate(doctorDTO.getCareerStartDate())
                .active(doctorDTO.isActive())
                .build();
        return doctor;
    }
}
