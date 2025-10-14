package com.backend.medibook.util;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.dto.DoctorDTO;
import com.backend.medibook.dto.SpecialtyDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Doctor;
import com.backend.medibook.entity.Specialty;
import org.springframework.stereotype.Component;

@Component
public class ClinicDoctorUtil {

    public ClinicDoctorDTO entityToModel(ClinicDoctor clinicDoctor){
        ClinicDoctorDTO clinicDoctorDTO = ClinicDoctorDTO.builder().clinicDoctorId(clinicDoctor.getClinicDoctorId())
                .clinicId(clinicDoctor.getClinic().getClinicId())
                .doctorId(clinicDoctor.getDoctor().getDoctorId())
                .specialtyId(clinicDoctor.getSpecialty().getSpecialtyId())
                .active(clinicDoctor.isActive())
                .build();

        return clinicDoctorDTO;
    }

    public ClinicDoctor modelToEntity(ClinicDoctorDTO clinicDoctorDTO, Clinic clinic, Doctor doctor , Specialty specialty){
        ClinicDoctor clinicDoctor = ClinicDoctor.builder()
                .clinic(clinic)
                .doctor(doctor)
                .specialty(specialty)
                .active(clinicDoctorDTO.isActive())
                .build();

        return clinicDoctor;
    }
}
