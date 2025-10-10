package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDTO;
import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.User;
import com.backend.medibook.exception.ClinicNameInvalidException;
import com.backend.medibook.exception.ClinicNotFoundException;
import com.backend.medibook.exception.ClinicPhoneInvalidException;
import com.backend.medibook.repository.ClinicRepository;
import com.backend.medibook.util.ClinicUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClinicServiceImpl implements ClinicService {
    @Autowired
    public ClinicRepository clinicRepository;

    @Autowired
    public ClinicUtil clinicUtil;


    public Clinic create(ClinicDTO clinicDTO) {
        clinicDTO.setName(clinicDTO.getName().toLowerCase());
        clinicDTO.setAddress(clinicDTO.getAddress().toLowerCase());
        clinicDTO.setEmail(clinicDTO.getEmail().toLowerCase());
        if(!clinicUtil.validateName(clinicDTO.getName())){
            throw new ClinicNameInvalidException("Tên clinic không hợp lệ");
        }
        if(!clinicUtil.validateEmail(clinicDTO.getEmail())){
            throw new ClinicNameInvalidException("Email clinic không hợp lệ");
        }
        if(!clinicUtil.validatePhone(clinicDTO.getPhoneNumber())) {
            throw new ClinicPhoneInvalidException("Số điện thoại clinic không hợp lệ");
        }
        if(!clinicUtil.validateAddress(clinicDTO.getAddress())) {
            throw new ClinicNameInvalidException("Địa chỉ clinic không hợp lệ");
        }
        Clinic clinic=clinicUtil.modelToEntity(clinicDTO);
        clinic=clinicRepository.save(clinic);
        return clinic;
    }


    public List<ClinicDTO> getAll(){
        List<Clinic> clinics=clinicRepository.findAll();
        List<ClinicDTO> clinicDTOS=new ArrayList<>();
        for(Clinic clinic:clinics){
            clinicDTOS.add(clinicUtil.entityToModel(clinic));
        }
        return clinicDTOS;
    }

    @Override
    public ClinicDTO getById(Integer clinicId) {
        return null;
    }


    public ClinicDTO getById(int clinicId) {
        Optional<Clinic> clinic=clinicRepository.findById(clinicId);
        if (clinic.isPresent()) {
            ClinicDTO clinicDTO= clinicUtil.entityToModel(clinic.get());
            return clinicDTO;
        }else{
            throw new ClinicNotFoundException("Không tìm thấy clinic với id này");
        }
    }


    public ClinicDTO getByName(String clinicName) {
        return null;
    }


    public List<ClinicDTO> getByNameContaining(String name,boolean active) {
        name= name.toLowerCase();
        List<Clinic> clinics=clinicRepository.findByNameContainingAndActive(name,active);
        List<ClinicDTO> clinicDTOS=new ArrayList<>();
        for(Clinic clinic:clinics){
            clinicDTOS.add(clinicUtil.entityToModel(clinic));
        }
        return clinicDTOS;
    }


    public ClinicDTO getByEmail(String email) {
        return null;
    }

    @Override
    public List<ClinicDTO> getByEmailContaining(String email, boolean active) {
        return List.of();
    }


    public List<ClinicDTO> getByEmailContaining(String email) {
        return List.of();
    }


    public ClinicDTO getByPhone(String phone) {
        return null;
    }

    @Override
    public List<ClinicDTO> getByPhoneContaining(String phone, boolean active) {
        return List.of();
    }

    @Override
    public List<ClinicDTO> getByAddressContaining(String address, boolean active) {
        return List.of();
    }


    public List<ClinicDTO> getByPhoneContaining(String phone) {
        return List.of();
    }


    public List<ClinicDTO> getByAddressContaining(String address) {
        return List.of();
    }

}
