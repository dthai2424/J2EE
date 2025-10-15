package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Doctor;
import com.backend.medibook.entity.Specialty;
import com.backend.medibook.exception.ClinicDoctorAlreadyExistException;
import com.backend.medibook.exception.ClinicNotFoundException;
import com.backend.medibook.exception.DoctorIdNotFoundException;
import com.backend.medibook.exception.SpecialtyNotFoundException;
import com.backend.medibook.repository.ClinicDoctorRepository;
import com.backend.medibook.repository.ClinicRepository;
import com.backend.medibook.repository.DoctorRepository;
import com.backend.medibook.repository.SpecialtyRepository;
import com.backend.medibook.util.ClinicDoctorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClinicDoctorServiceImpl implements ClinicDoctorService {
    @Autowired
    private ClinicDoctorRepository clinicDoctorRepository;

    @Autowired
    private ClinicDoctorUtil clinicDoctorUtil;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Override
    public ClinicDoctorDTO create(ClinicDoctorDTO clinicDoctorDTO) {
        Integer doctorId=clinicDoctorDTO.getDoctorId();
        Integer clinicId=clinicDoctorDTO.getClinicId();
        Integer specialtyId=clinicDoctorDTO.getSpecialtyId();

        Optional<Doctor> doctor= doctorRepository.findByDoctorId(doctorId);
        Optional<Clinic> clinic= clinicRepository.findById(clinicId);
        Optional<Specialty> specialty=specialtyRepository.findById(specialtyId);
        if(doctor.isEmpty()){
            throw new DoctorIdNotFoundException("Không tìm thấy doctor với ID:" + doctorId);
        }
        if(clinic.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy clinic với ID:" + clinicId);
        }

        if(specialty.isEmpty()){
            throw new SpecialtyNotFoundException("Không tìm thấy specialty với ID:" + specialtyId);
        }

        if (clinicDoctorRepository.existsBySpecialty_SpecialtyIdAndDoctor_DoctorIdAndClinic_ClinicId(
                specialtyId, doctorId, clinicId)) {
            throw new ClinicDoctorAlreadyExistException(
                    "Doctor với ID:" + doctorId +
                            " đã có trong clinic với ID:" + clinicId +
                            " và specialty với ID:" + specialtyId
            );
        }

        ClinicDoctor clinicDoctor = clinicDoctorUtil.modelToEntity(clinicDoctorDTO,clinic.get(),doctor.get(),specialty.get());
        clinicDoctor=clinicDoctorRepository.save(clinicDoctor);

        return  clinicDoctorUtil.entityToModel(clinicDoctor);
    }

    @Override
    public ClinicDoctorDTO update(ClinicDoctorDTO clinicDoctorDTO) {
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
