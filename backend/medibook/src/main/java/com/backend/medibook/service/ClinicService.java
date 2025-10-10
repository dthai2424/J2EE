package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.repository.ClinicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ClinicService {
    Clinic create(ClinicDTO clinicDTO);

    List<ClinicDTO> getAll();

    ClinicDTO getById(Integer clinicId);

    ClinicDTO getByName(String clinicName);

    List<ClinicDTO> getByNameContaining(String clinicName,boolean active);

    ClinicDTO getByEmail(String email);

    List<ClinicDTO> getByEmailContaining(String email,boolean active);

    ClinicDTO getByPhone(String phone);

    List<ClinicDTO> getByPhoneContaining(String phone,boolean active);

    List<ClinicDTO> getByAddressContaining(String address,boolean active);

}
