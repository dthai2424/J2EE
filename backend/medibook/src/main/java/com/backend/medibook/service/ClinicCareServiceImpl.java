package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicCareDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicCare;
import com.backend.medibook.entity.Specialty;
import com.backend.medibook.exception.ClinicCareNameInvalidException;
import com.backend.medibook.exception.ClinicCarePriceInvalidException;
import com.backend.medibook.exception.ClinicNotFoundException;
import com.backend.medibook.exception.SpecialtyNotFoundException;
import com.backend.medibook.repository.ClinicCareRepository;
import com.backend.medibook.repository.ClinicRepository;
import com.backend.medibook.repository.SpecialtyRepository;
import com.backend.medibook.util.ClinicCareUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClinicCareServiceImpl implements ClinicCareService {
    @Autowired
    private ClinicCareRepository clinicCareRepository;

    @Autowired
    private ClinicCareUtil clinicCareUtil;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Override
    public ClinicCareDTO create(ClinicCareDTO clinicCareDTO) {
        clinicCareDTO.setName(clinicCareDTO.getName().toLowerCase());
        clinicCareDTO.setDescription(clinicCareDTO.getDescription().toLowerCase());
        Optional<Clinic> clinic=clinicRepository.findById(clinicCareDTO.getClinicId());
        Optional<Specialty> specialty=specialtyRepository.findById(clinicCareDTO.getSpecialtyId());

        if(clinic.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:"+clinicCareDTO.getClinicId());
        }
        if(specialty.isEmpty()){
            throw new SpecialtyNotFoundException("Không tìm thấy chuyên khoa với id:"+clinicCareDTO.getSpecialtyId());
        }
        if(!clinicCareUtil.validateName(clinicCareDTO.getName())){
            throw new ClinicCareNameInvalidException("Tên dịch vụ không hợp lệ");
        }
        if(!clinicCareUtil.validatePrice(clinicCareDTO.getPrice())) {
            throw new ClinicCarePriceInvalidException("Giá dịch vụ phải là số dương");
        }

        ClinicCare clinicCare= clinicCareUtil.modelToEntity(clinicCareDTO,clinic.get(),specialty.get());
        clinicCare=clinicCareRepository.save(clinicCare);
        return clinicCareUtil.entityToModel(clinicCare);
    }

    @Override
    //Chỉ cho update name description và price
    public ClinicCareDTO update(Integer clinicCareId, ClinicCareDTO clinicCareDTO) {
        clinicCareDTO.setName(clinicCareDTO.getName().toLowerCase());
        clinicCareDTO.setDescription(clinicCareDTO.getDescription().toLowerCase());
        Optional<ClinicCare> existingClinicCare=clinicCareRepository.findById(clinicCareId);

        if(existingClinicCare.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy dịch vụ với id:"+clinicCareId);
        }

        Optional<Clinic> clinic=clinicRepository.findById(clinicCareDTO.getClinicId());
        Optional<Specialty> specialty=specialtyRepository.findById(clinicCareDTO.getSpecialtyId());

        if(clinic.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:"+clinicCareDTO.getClinicId());
        }
        if(specialty.isEmpty()){
            throw new SpecialtyNotFoundException("Không tìm thấy chuyên khoa với id:"+clinicCareDTO.getSpecialtyId());
        }
        if(!clinicCareUtil.validateName(clinicCareDTO.getName())){
            throw new ClinicCareNameInvalidException("Tên dịch vụ không hợp lệ");
        }
        if(!clinicCareUtil.validatePrice(clinicCareDTO.getPrice())) {
            throw new ClinicCarePriceInvalidException("Giá dịch vụ phải là số dương");
        }
        ClinicCare clinicCare= clinicCareUtil.modelToEntity(clinicCareDTO,clinic.get(),specialty.get());
        clinicCare.setClinicCareId(clinicCareId);
        clinicCare=clinicCareRepository.save(clinicCare);
        return clinicCareUtil.entityToModel(clinicCare);
    }

    @Override
    public ClinicCareDTO getById(Integer clinicCareId) {
        Optional<ClinicCare> clinicCare=clinicCareRepository.findById(clinicCareId);
        if(clinicCare.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy dịch vụ với id:"+clinicCareId);
        }
        return clinicCareUtil.entityToModel(clinicCare.get());
    }

    @Override
    public List<ClinicCareDTO> getAllByClinic(Integer clinicId,boolean active) {
        Optional<Clinic> clinic=clinicRepository.findById(clinicId);
        if(clinic.isEmpty()) {
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:" + clinicId);
        }
        List<ClinicCare> clinicCares=clinicCareRepository.findByClinic_ClinicIdAndActive(clinicId,active);
        List<ClinicCareDTO> clinicCareDTOS=new ArrayList<>();
        for(ClinicCare clinicCare:clinicCares){
            clinicCareDTOS.add(clinicCareUtil.entityToModel(clinicCare));
        }
        return clinicCareDTOS;
    }

    @Override
    public List<ClinicCareDTO> getByNameInClinic(Integer clinicId, String name,boolean active) {
        name=name.toLowerCase();
        Optional<Clinic> clinic=clinicRepository.findById(clinicId);
        if(clinic.isEmpty()) {
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:" + clinicId);
        }
        List<ClinicCare> clinicCares=clinicCareRepository.findByClinic_ClinicIdAndNameContainingAndActive(clinicId,name,active);
        List<ClinicCareDTO> clinicCareDTOS=new ArrayList<>();
        for(ClinicCare clinicCare:clinicCares){
            clinicCareDTOS.add(clinicCareUtil.entityToModel(clinicCare));
        }
        return clinicCareDTOS;

    }

    @Override
    public List<ClinicCareDTO> getByDescriptionInClinic(Integer clinicId, String description,boolean active) {
        description=description.toLowerCase();
        Optional<Clinic> clinic=clinicRepository.findById(clinicId);
        if(clinic.isEmpty()) {
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:" + clinicId);
        }
        List<ClinicCare> clinicCares=clinicCareRepository.findByClinic_ClinicIdAndDescriptionContainingAndActive(clinicId,description,active);
        List<ClinicCareDTO> clinicCareDTOS=new ArrayList<>();
        for(ClinicCare clinicCare:clinicCares){
            clinicCareDTOS.add(clinicCareUtil.entityToModel(clinicCare));
        }
        return clinicCareDTOS;
    }

    @Override
    public List<ClinicCareDTO> getAllByClinicAndSpecialty(Integer clinicId, Integer specialtyId,boolean active) {

        Optional<Clinic> clinic=clinicRepository.findById(clinicId);
        if(clinic.isEmpty()) {
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:" + clinicId);
        }
        List<ClinicCare> clinicCares=clinicCareRepository.findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive(clinicId,specialtyId,active);
        List<ClinicCareDTO> clinicCareDTOS=new ArrayList<>();
        for(ClinicCare clinicCare:clinicCares){
            clinicCareDTOS.add(clinicCareUtil.entityToModel(clinicCare));
        }
        return clinicCareDTOS;
    }
}
