package com.backend.medibook.repository;

import com.backend.medibook.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Repository
public interface DoctorRepository extends JpaRepository<Doctor,Integer> {
    Optional<Doctor> findByDoctorId(Integer doctorId);

    List<Doctor> findByCareerStartDateAndActive(LocalDateTime dateTime,boolean active);

    Optional<Doctor> findByLicenseNumber(String licenseNumber);

    List<Doctor> findByUser_EmailContainingAndActive(String email,boolean active);

    List<Doctor> findByUser_PhoneNumberContainingAndActive(String phoneNumber,boolean active);

    List<Doctor> findByLicenseNumberContainingAndActive(String licenseNumber,boolean active);

    List<Doctor> findByCareerStartDateBetweenAndActiveAndActive(LocalDateTime startDate,LocalDateTime endDate,boolean active);

    List<Doctor> findByActive(boolean active);
}
