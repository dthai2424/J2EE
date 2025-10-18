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


    public ClinicDTO create(ClinicDTO clinicDTO) {
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
        return clinicUtil.entityToModel(clinic);
    }
    public ClinicDTO update(ClinicDTO clinicDTO){
        Optional<Clinic> clinic=clinicRepository.findById(clinicDTO.getClinicId());
        if(clinic.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:"+clinicDTO.getClinicId());
        }
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
        Clinic updatedClinic=clinic.get();
        updatedClinic.setName(clinicDTO.getName());
        updatedClinic.setAddress(clinicDTO.getAddress());
        updatedClinic.setEmail(clinicDTO.getEmail());
         updatedClinic=clinicRepository.save(updatedClinic);
        return clinicUtil.entityToModel(updatedClinic);
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
            throw new ClinicNotFoundException("Không tìm thấy clinic với id:"+clinicId);
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



    @Override
    public List<ClinicDTO> getByEmailContaining(String email, boolean active) {
        email= email.toLowerCase();
        List<Clinic> clinics=clinicRepository.findByEmailContainingAndActive(email,active);
        List<ClinicDTO> clinicDTOS=new ArrayList<>();
        for(Clinic clinic:clinics){
            clinicDTOS.add(clinicUtil.entityToModel(clinic));
        }
        return clinicDTOS;
    }

    @Override
    public List<ClinicDTO> getByPhoneContaining(String phone, boolean active) {

        List<Clinic> clinics=clinicRepository.findByPhoneNumberContainingAndActive(phone,active);
        List<ClinicDTO> clinicDTOS=new ArrayList<>();
        for(Clinic clinic:clinics){
            clinicDTOS.add(clinicUtil.entityToModel(clinic));
        }
        return clinicDTOS;
    }

    @Override
    public List<ClinicDTO> getByAddressContaining(String address, boolean active) {
        List<Clinic> clinics=clinicRepository.findByAddressContainingAndActive(address,active);
        List<ClinicDTO> clinicDTOS=new ArrayList<>();
        for(Clinic clinic:clinics){
            clinicDTOS.add(clinicUtil.entityToModel(clinic));
        }
        return clinicDTOS;
    }


}
