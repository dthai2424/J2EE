package com.backend.medibook.repository;

import com.backend.medibook.entity.ClinicDoctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ClinicDoctorRepository extends JpaRepository<ClinicDoctor,Integer> {
    List<ClinicDoctor> findByClinic_ClinicIdAndActive( Integer clinicId,boolean active);

    List<ClinicDoctor> findByDoctor_DoctorIdAndActive( Integer doctorId,boolean active);

    List<ClinicDoctor> findByDoctor_DoctorIdAndClinic_clinicIdAndActive(Integer doctorId, Integer clinicId,boolean active);

    List<ClinicDoctor> findBySpecialty_SpecialtyIdAndClinic_ClinicIdAndActive( Integer specialtyId, Integer clinicId,boolean active);

    List<ClinicDoctor> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive( Integer clinicId, Integer specialtyId,boolean active);

    boolean existsBySpecialty_SpecialtyIdAndDoctor_DoctorIdAndClinic_ClinicId(Integer specialtyId, Integer doctorId, Integer clinicId);

}
