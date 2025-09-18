package com.backend.medibook.repository;

import com.backend.medibook.entity.Specialty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SpecialtyRepository extends JpaRepository<Specialty,Integer> {

    Optional<Specialty> findBySpecialtyIdAndActive(Integer specialtyId,boolean Active);

    Optional<Specialty> findByNameContainingAndActive(String name,boolean active);

    List<Specialty> findByActive(boolean active);

}
