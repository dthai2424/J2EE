package com.backend.medibook.service;

import com.backend.medibook.dto.DoctorDTO;
import com.backend.medibook.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public interface DoctorService {
    DoctorDTO create(UserDTO userDTO,String password, DoctorDTO doctorDTO);

    DoctorDTO update(DoctorDTO doctorDTO);

    List<DoctorDTO> getAll(boolean active);

    DoctorDTO getByID(Integer doctorId);

    List<DoctorDTO> getByEmailContaining(String email,boolean active);

    List<DoctorDTO> getByPhoneContaining(String phone,boolean active);

    List<DoctorDTO> getByLicenseNumberContaining(String licenseNumber,boolean active);

   List<DoctorDTO> getByCareerStartBetween(LocalDateTime startDate, LocalDateTime endDate, boolean active);

}
