package com.backend.medibook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ClinicCareRepository extends JpaRepository<com.backend.medibook.entity.ClinicCare,Integer> {
    Optional<com.backend.medibook.entity.ClinicCare> findByClinicServiceId(Integer clinicServiceId);

    List<com.backend.medibook.entity.ClinicCare> findByClinic_ClinicIdAndActive(Integer clinicId, boolean active);

    List<com.backend.medibook.entity.ClinicCare> findBySpecialty_SpecialtyIdAndActive(Integer specialtyId, boolean active);

    List<com.backend.medibook.entity.ClinicCare> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive(Integer clinicId, Integer specialtyId, boolean active);

    List<com.backend.medibook.entity.ClinicCare> findByClinic_ClinicIdAndNameContainingAndActive(Integer clinicId, String name, boolean active);

    List<com.backend.medibook.entity.ClinicCare> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndNameContainingAndActive(Integer clinicId, Integer specialtyId, String name, boolean active);
}
