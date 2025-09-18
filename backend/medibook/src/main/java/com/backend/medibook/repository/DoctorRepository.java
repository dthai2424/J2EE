package com.backend.medibook.repository;

import com.backend.medibook.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor,Integer> {
    Optional<Doctor> findByDoctorId(Integer doctorId);

    List<Doctor> findByCareerStartDateAndActive(LocalDateTime dateTime,boolean active);

    Optional<Doctor> findByLicenseNumber(String licenseNumber);

}
