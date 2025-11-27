package com.backend.medibook.util;

import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Doctor;
import com.backend.medibook.entity.Specialty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ClinicDoctorUtil {

    @Autowired
    private ClinicUtil clinicUtil;
    @Autowired
    private DoctorUtil doctorUtil;
    @Autowired
    private SpecialtyUtil specialtyUtil;

    public ClinicDoctorDTO entityToModel(ClinicDoctor clinicDoctor){
        return ClinicDoctorDTO.builder()
                .clinicDoctorId(clinicDoctor.getClinicDoctorId())
                .clinicId(clinicDoctor.getClinic().getClinicId())
                .doctorId(clinicDoctor.getDoctor().getDoctorId())
                .specialtyId(clinicDoctor.getSpecialty().getSpecialtyId())
                .clinic(clinicUtil.entityToModel(clinicDoctor.getClinic()))
                .doctor(doctorUtil.entityToModel(clinicDoctor.getDoctor()))
                .specialty(specialtyUtil.entityToModel(clinicDoctor.getSpecialty()))
                .active(clinicDoctor.isActive())
                .build();
    }

    public ClinicDoctor modelToEntity(ClinicDoctorDTO clinicDoctorDTO, Clinic clinic, Doctor doctor , Specialty specialty){
        return ClinicDoctor.builder()
                .clinicDoctorId(clinicDoctorDTO.getClinicDoctorId()) // Cần thiết nếu cập nhật
                .clinic(clinic)      // Thiết lập Clinic
                .doctor(doctor)      // Thiết lập Doctor
                .specialty(specialty) // Thiết lập Specialty
                .active(clinicDoctorDTO.isActive())
                .build();
    }
}