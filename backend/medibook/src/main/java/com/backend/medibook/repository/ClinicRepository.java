package com.backend.medibook.repository;

import com.backend.medibook.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface   ClinicRepository extends JpaRepository<Clinic, Integer> {
    List<Clinic> findByActive(boolean active);

    Optional<Clinic> findById(Integer id);

    List<Clinic> findByNameContainingAndActive(String name,boolean active);

    List<Clinic> findByEmailContainingAndActive(String email,boolean active);

    List<Clinic> findByPhoneNumberContainingAndActive(String phoneNumber,boolean active);

    List<Clinic> findByAddressContainingAndActive(String address,boolean active);


}
