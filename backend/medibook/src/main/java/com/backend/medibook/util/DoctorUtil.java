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
        // SỬA LỖI: Chỉ set doctorId nếu là update (ID > 0).
        // Nếu ID là 0, để mặc định không set, JPA sẽ tự động tạo ID.

        var builder = Doctor.builder()
                .user(userUtil.modelToEntity(doctorDTO.getUser()))
                .licenseNumber(doctorDTO.getLicenseNumber())
                .careerStartDate(doctorDTO.getCareerStartDate())
                .active(doctorDTO.isActive());

        if (doctorDTO.getDoctorId() > 0) {
            builder.doctorId(doctorDTO.getDoctorId());
        }

        return builder.build();
    }
}