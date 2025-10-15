package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicCareDTO;
import com.backend.medibook.entity.ClinicCare;


import com.backend.medibook.dto.ClinicCareDTO;
import java.util.List;

public interface ClinicCareService {


    ClinicCareDTO create(ClinicCareDTO clinicCareDTO);

    ClinicCareDTO update(Integer clinicCareId, ClinicCareDTO clinicCareDTO);

    ClinicCareDTO getById(Integer clinicCareId);

    List<ClinicCareDTO> getAllByClinic(Integer clinicId,boolean active);

    List<ClinicCareDTO> getByNameInClinic(Integer clinicId, String name,boolean active);

    List<ClinicCareDTO> getByDescriptionInClinic(Integer clinicId, String description,boolean active);

    List<ClinicCareDTO> getAllByClinicAndSpecialty(Integer clinicId, Integer specialtyId,boolean active);
}