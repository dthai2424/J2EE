package com.backend.medibook.repository;

import com.backend.medibook.entity.ClinicDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClinicDoctorRepository extends JpaRepository<ClinicDoctor,Integer> {
    List<ClinicDoctor> findByActiveAndClinic_ClinicId(boolean active, Integer clinicId);

    List<ClinicDoctor> findByActiveAndDoctor_DoctorId(boolean active, Integer doctorId);

    List<ClinicDoctor> findByActiveAndDoctor_DoctorIdAndClinic_clinicId(boolean active, Integer doctorId, Integer clinicId);

    List<ClinicDoctor> findByActiveAndSpecialty_SpecialtyIdAndClinic_ClinicId(boolean active, Integer specialtyId, Integer clinicId);

    boolean existsBySpecialty_SpecialtyIdAndDoctor_DoctorIdAndClinic_ClinicId(Integer specialtyId, Integer doctorId, Integer clinicId);

}
