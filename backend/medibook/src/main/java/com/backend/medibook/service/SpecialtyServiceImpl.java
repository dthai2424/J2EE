package com.backend.medibook.service;

import com.backend.medibook.dto.SpecialtyDTO;
import com.backend.medibook.entity.Specialty;
import com.backend.medibook.exception.SpecialtyNameInvalidException;
import com.backend.medibook.exception.SpecialtyNotFoundException;
import com.backend.medibook.repository.SpecialtyRepository;
import com.backend.medibook.util.SpecialtyUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SpecialtyServiceImpl implements SpecialtyService {
    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Autowired
    private  SpecialtyUtil specialtyUtil;

    @Override
    public SpecialtyDTO create(SpecialtyDTO specialtyDTO) {
        specialtyDTO.setName(specialtyDTO.getName().toLowerCase());
        specialtyDTO.setDescription(specialtyDTO.getDescription().toLowerCase());
        if(specialtyDTO.getName()==null){
            throw new SpecialtyNameInvalidException("Tên chuyên khoa không hợp lệ");
        }
        Specialty specialty=specialtyUtil.modelToEntity(specialtyDTO);
        specialty=specialtyRepository.save(specialty);
        return specialtyUtil.entityToModel(specialty);
    }

    @Override
    public SpecialtyDTO update(SpecialtyDTO specialtyDTO) {
        specialtyDTO.setName(specialtyDTO.getName().toLowerCase());
        specialtyDTO.setDescription(specialtyDTO.getDescription().toLowerCase());
        if(specialtyDTO.getName()==null){
            throw new SpecialtyNameInvalidException("Tên chuyên khoa không hợp lệ");
        }
        Specialty specialty=Specialty.builder().name(specialtyDTO.getName()).description(specialtyDTO.getDescription()).build();
        return specialtyRepository.save(specialty)!=null?specialtyUtil.entityToModel(specialty):null;
    }

    @Override
    public SpecialtyDTO getByID(Integer specialtyId) {
        Optional<Specialty> specialty=specialtyRepository.findById(specialtyId);
        if(specialty.isPresent()){
            return specialtyUtil.entityToModel(specialty.get());
        }else throw new SpecialtyNotFoundException("Không tìm thấy chuyên khoa với id: "+specialtyId);
    }

    @Override
    public List<SpecialtyDTO> getAllActive(boolean active) {
        List<Specialty> specialties=specialtyRepository.findByActive(active);
        List<SpecialtyDTO> specialtieDTOS=new ArrayList<>();
        for(Specialty specialty:specialties){
            specialtieDTOS.add(specialtyUtil.entityToModel(specialty));
        }
        return specialtieDTOS;
    }

    @Override
    public List<SpecialtyDTO> getByNameContain(String name, boolean active) {
        name=name.toLowerCase();

        List<Specialty> specialties=specialtyRepository.findByNameContainingAndActive(name,active);
        List<SpecialtyDTO> specialtieDTOS=new ArrayList<>();
        for(Specialty specialty:specialties){
            specialtieDTOS.add(specialtyUtil.entityToModel(specialty));
        }
        return specialtieDTOS;
    }

    @Override
    public List<SpecialtyDTO> getByDescriptionContain(String description, boolean active) {
        description=description.toLowerCase();
        List<Specialty> specialties=specialtyRepository.findByDescriptionContainingAndActive(description,active);
        List<SpecialtyDTO> specialtieDTOS=new ArrayList<>();
        for(Specialty specialty:specialties){
            specialtieDTOS.add(specialtyUtil.entityToModel(specialty));
        }
        return specialtieDTOS;

    }
}
