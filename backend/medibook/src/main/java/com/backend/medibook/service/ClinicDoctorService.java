package com.backend.medibook.service;


import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.entity.ClinicDoctor;

import java.util.List;

public interface ClinicDoctorService {
    ClinicDoctorDTO create(ClinicDoctorDTO clinicDoctorDTO,boolean active);

    ClinicDoctorDTO update(ClinicDoctorDTO clinicDoctorDTO,boolean active);

    List<ClinicDoctorDTO> getAllDoctorsInClinic(Integer clinicId,boolean active);

    List<ClinicDoctorDTO> getAllDoctorsInClinicBySpecialty(Integer clinicId, Integer specialtyId,boolean active);

    List<ClinicDoctorDTO> getAllClinicsOfDoctor(Integer doctorId,boolean active);
}
