package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClinicService {
    ClinicDTO create(ClinicDTO clinicDTO);

    List<ClinicDTO> getAll();

    ClinicDTO update(ClinicDTO clinicDTO);

    ClinicDTO getById(Integer clinicId);

    List<ClinicDTO> getByNameContaining(String clinicName,boolean active);

    List<ClinicDTO> getByEmailContaining(String email,boolean active);

    List<ClinicDTO> getByPhoneContaining(String phone,boolean active);

    List<ClinicDTO> getByAddressContaining(String address,boolean active);

}
