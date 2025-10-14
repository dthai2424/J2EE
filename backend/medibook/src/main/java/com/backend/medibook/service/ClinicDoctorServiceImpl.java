package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.repository.ClinicDoctorRepository;
import com.backend.medibook.util.ClinicDoctorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicDoctorServiceImpl implements ClinicDoctorService {
    @Autowired
    private ClinicDoctorRepository clinicDoctorRepository;

    @Autowired
    private ClinicDoctorUtil clinicDoctorUtil;

    @Override
    public ClinicDoctorDTO create(ClinicDoctorDTO clinicDoctorDTO, boolean active) {
        return null;
    }

    @Override
    public ClinicDoctorDTO update(ClinicDoctorDTO clinicDoctorDTO, boolean active) {
        return null;
    }

    @Override
    public List<ClinicDoctorDTO> getAllDoctorsInClinic(Integer clinicId, boolean active) {
        return List.of();
    }

    @Override
    public List<ClinicDoctorDTO> getAllDoctorsInClinicBySpecialty(Integer clinicId, Integer specialtyId, boolean active) {
        return List.of();
    }

    @Override
    public List<ClinicDoctorDTO> getAllClinicsOfDoctor(Integer doctorId, boolean active) {
        return List.of();
    }
}
