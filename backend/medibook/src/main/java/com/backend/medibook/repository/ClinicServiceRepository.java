package com.backend.medibook.repository;

import com.backend.medibook.entity.ClinicService;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClinicServiceRepository extends JpaRepository<ClinicService,Integer> {
    Optional<ClinicService> findByClinicServiceId(Integer clinicServiceId);

    List<ClinicService> findByCLinic_ClinicIdAndActive(Integer clinicId,boolean active);

    List<ClinicService> findBySpecialty_SpecialtyIdAndActive(Integer specialtyId,boolean active);

    List<ClinicService> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive(Integer clinicId,boolean active);

    List<ClinicService> findByClinic_ClinicIdAndNameContainingAndActive(Integer clinicId, String name,boolean active);

    List<ClinicService> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndNameContainingAndActive(Integer clinicId, Integer specialtyId, String name,boolean active);
}
