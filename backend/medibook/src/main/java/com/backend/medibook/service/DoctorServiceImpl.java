package com.backend.medibook.service;

import com.backend.medibook.dto.DoctorDTO;
import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.Doctor;
import com.backend.medibook.entity.Role;
import com.backend.medibook.exception.DoctorIdNotFoundException;
import com.backend.medibook.exception.DoctorLicenseInvalidException;
import com.backend.medibook.repository.DoctorRepository;
import com.backend.medibook.util.DoctorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private DoctorUtil doctorUtil;

    @Autowired
    private UserService userService;

    @Override
    public DoctorDTO create(UserDTO userDTO,String password, DoctorDTO doctorDTO) {
        userDTO.setRole(Role.valueOf("Doctor"));
        userDTO=userService.create(userDTO,password);
        doctorDTO.setUser(userDTO);
        Doctor doctor=doctorRepository.save(doctorUtil.modelToEntity(doctorDTO));
        doctorDTO=doctorUtil.entityToModel(doctor);
        return doctorDTO;
    }

    @Override
    public DoctorDTO update(DoctorDTO doctorDTO) {
        Doctor doctor=doctorRepository.getById(doctorDTO.getDoctorId());
        if(doctor==null){
            throw new DoctorIdNotFoundException("Không tìm thấy doctor với ID:"+doctorDTO.getDoctorId());
        }
        String licenseNumber= doctorDTO.getLicenseNumber();
        licenseNumber=licenseNumber.toLowerCase();
        if(licenseNumber==null || licenseNumber.isEmpty()){
            throw new DoctorLicenseInvalidException("Số giấy phép hành nghề không hợp lệ");
        }
        doctor.setLicenseNumber(licenseNumber);
        LocalDateTime careerStartDate=doctorDTO.getCareerStartDate();
        if(careerStartDate==null || careerStartDate.isAfter(LocalDateTime.now())){
            throw new DoctorLicenseInvalidException("Ngày bắt đầu hành nghề không hợp lệ");
        }
        doctor.setCareerStartDate(careerStartDate);
        doctor=doctorRepository.save(doctor);
        doctorDTO=doctorUtil.entityToModel(doctor);
        return doctorDTO;
    }

    @Override
    public List<DoctorDTO> getAll(boolean active) {
        List<Doctor> doctors=doctorRepository.findByActive(active);
        List<DoctorDTO> doctorDTOS=new ArrayList<>();
        for(Doctor doctor:doctors){
            DoctorDTO doctorDTO=doctorUtil.entityToModel(doctor);
            doctorDTOS.add(doctorDTO);
        }
        return doctorDTOS;
    }

    @Override
    public DoctorDTO getByID(Integer doctorId) {
        Optional<Doctor> doctor=doctorRepository.findByDoctorId(doctorId);
        if(doctor.isEmpty()){
            throw new DoctorIdNotFoundException("Không tìm thấy doctor với ID:"+doctorId);
        }
        return doctorUtil.entityToModel(doctor.get());
    }

    @Override
    public List<DoctorDTO> getByEmailContaining(String email,boolean active) {
        List<Doctor> doctors=doctorRepository.findByUser_EmailContainingAndActive(email,active);
        List<DoctorDTO> doctorDTOS=new ArrayList<>();
        for(Doctor doctor:doctors){
            DoctorDTO doctorDTO=doctorUtil.entityToModel(doctor);
            doctorDTOS.add(doctorDTO);
        }
        return doctorDTOS;
    }

    @Override
    public List<DoctorDTO> getByPhoneContaining(String phone,boolean active) {
        List<Doctor> doctors=doctorRepository.findByUser_PhoneNumberContainingAndActive(phone,active);
        List<DoctorDTO> doctorDTOS=new ArrayList<>();
        for(Doctor doctor:doctors){
            DoctorDTO doctorDTO=doctorUtil.entityToModel(doctor);
            doctorDTOS.add(doctorDTO);
        }
        return doctorDTOS;
    }

    @Override
    public List<DoctorDTO> getByLicenseNumberContaining(String licenseNumber,boolean active) {
        List<Doctor> doctors=doctorRepository.findByLicenseNumberContainingAndActive(licenseNumber,active)     ;
        List<DoctorDTO> doctorDTOS=new ArrayList<>();
        for(Doctor doctor:doctors){
            DoctorDTO doctorDTO=doctorUtil.entityToModel(doctor);
            doctorDTOS.add(doctorDTO);
        }
        return doctorDTOS;
    }

    @Override
    public List<DoctorDTO> getByCareerStartBetween(LocalDateTime startDate, LocalDateTime endDate,boolean active) {
        List<Doctor> doctors=doctorRepository.findByCareerStartDateBetweenAndActive(startDate,endDate,active);
        List<DoctorDTO> doctorDTOS=new ArrayList<>();
        for(Doctor doctor:doctors){
            DoctorDTO doctorDTO=doctorUtil.entityToModel(doctor);
            doctorDTOS.add(doctorDTO);
        }
        return doctorDTOS;
    }
}
