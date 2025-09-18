package com.backend.medibook.repository;

import com.backend.medibook.entity.ClinicDoctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClinicDoctorRepository extends JpaRepository<ClinicDoctor,Integer> {
    List<ClinicDoctor> findByActiveAndClinic_ClinicId(boolean active, Integer clinicId);

    List<ClinicDoctor> findByActiveAndDoctor_DoctorId(boolean active, Integer doctorId);

    List<ClinicDoctor> findByActiveAndDoctor_DoctorIdAndClinic_clinicId(boolean active, Integer doctorId, Integer clinicId);

    List<ClinicDoctor> findByActiveAndSpecialty_SpecialtyIdAndClinic_ClinicId(boolean active, Integer specialtyId, Integer clinicId);

    boolean existsByActiveAndSpecialty_SpecialtyIdAndDoctor_DoctorIdAndClinic_ClinicId(boolean active, Integer specialtyId, Integer doctorId, Integer clinicId);

}
