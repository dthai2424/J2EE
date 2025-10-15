package com.backend.medibook.service;


import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.entity.ClinicDoctor;

import java.util.List;

public interface ClinicDoctorService {
    ClinicDoctorDTO create(ClinicDoctorDTO clinicDoctorDTO);

    ClinicDoctorDTO update(ClinicDoctorDTO clinicDoctorDTO,boolean isChangeStatus);

    List<ClinicDoctorDTO> getAllDoctorsInClinic(Integer clinicId,boolean active);

    List<ClinicDoctorDTO> getAllDoctorsInClinicBySpecialty(Integer clinicId, Integer specialtyId,boolean active);

    List<ClinicDoctorDTO> getAllClinicsOfDoctor(Integer doctorId,boolean active);
}
