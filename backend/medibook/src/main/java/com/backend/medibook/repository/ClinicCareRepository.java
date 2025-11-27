package com.backend.medibook.repository;

import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicCare;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface ClinicCareRepository extends JpaRepository<ClinicCare,Integer> {
    Optional<ClinicCare> findByClinicCareId(Integer clinicCareId);

    List<ClinicCare> findByClinic_ClinicIdAndActive(Integer clinicId, boolean active);

    List<ClinicCare> findBySpecialty_SpecialtyIdAndActive(Integer specialtyId, boolean active);

    List<ClinicCare> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive(Integer clinicId, Integer specialtyId, boolean active);

    List<ClinicCare> findByClinic_ClinicIdAndNameContainingAndActive(Integer clinicId, String name, boolean active);

    List<ClinicCare> findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndNameContainingAndActive(Integer clinicId, Integer specialtyId, String name, boolean active);

    List<ClinicCare> findByClinic_ClinicIdAndDescriptionContainingAndActive(Integer clinicId, String description, boolean active);
    // Thêm mới: Lấy tất cả dịch vụ đang active
    List<ClinicCare> findByActive(boolean active);
}
