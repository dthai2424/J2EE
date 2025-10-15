package com.backend.medibook.service;

import com.backend.medibook.dto.ClinicDoctorDTO;
import com.backend.medibook.entity.Clinic;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Doctor;
import com.backend.medibook.entity.Specialty;
import com.backend.medibook.exception.*;
import com.backend.medibook.repository.ClinicDoctorRepository;
import com.backend.medibook.repository.ClinicRepository;
import com.backend.medibook.repository.DoctorRepository;
import com.backend.medibook.repository.SpecialtyRepository;
import com.backend.medibook.util.ClinicDoctorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ClinicDoctorServiceImpl implements ClinicDoctorService {
    @Autowired
    private ClinicDoctorRepository clinicDoctorRepository;

    @Autowired
    private ClinicDoctorUtil clinicDoctorUtil;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ClinicRepository clinicRepository;

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @Override
    public ClinicDoctorDTO create(ClinicDoctorDTO clinicDoctorDTO) {
        Integer doctorId=clinicDoctorDTO.getDoctorId();
        Integer clinicId=clinicDoctorDTO.getClinicId();
        Integer specialtyId=clinicDoctorDTO.getSpecialtyId();

        Optional<Doctor> doctor= doctorRepository.findByDoctorId(doctorId);
        Optional<Clinic> clinic= clinicRepository.findById(clinicId);
        Optional<Specialty> specialty=specialtyRepository.findById(specialtyId);
        if(doctor.isEmpty()){
            throw new DoctorIdNotFoundException("Không tìm thấy doctor với ID:" + doctorId);
        }
        if(clinic.isEmpty()){
            throw new ClinicNotFoundException("Không tìm thấy clinic với ID:" + clinicId);
        }

        if(specialty.isEmpty()){
            throw new SpecialtyNotFoundException("Không tìm thấy specialty với ID:" + specialtyId);
        }

        if (clinicDoctorRepository.existsBySpecialty_SpecialtyIdAndDoctor_DoctorIdAndClinic_ClinicId(
                specialtyId, doctorId, clinicId)) {
            throw new ClinicDoctorAlreadyExistException(
                    "Doctor với ID:" + doctorId +
                            " đã có trong clinic với ID:" + clinicId +
                            " và specialty với ID:" + specialtyId
            );
        }

        ClinicDoctor clinicDoctor = clinicDoctorUtil.modelToEntity(clinicDoctorDTO,clinic.get(),doctor.get(),specialty.get());
        clinicDoctor=clinicDoctorRepository.save(clinicDoctor);

        return  clinicDoctorUtil.entityToModel(clinicDoctor);
    }

    @Override
    // Ta có 2 trường hợp update:
    // 1. isChangeStatus=true: Chỉ thay đổi trạng thái active của ClinicDoctor hiện tại thành true
    // 2. isChangeStatus=false: Thay đổi thông tin cúa 1 trong 3 trường clinicId, doctorId, specialtyId
    //    thì ta sẽ set active=false cho ClinicDoctor hiện tại và tạo mới 1 ClinicDoctor với thông tin mới và active=true

    public ClinicDoctorDTO update(ClinicDoctorDTO clinicDoctorDTO,boolean isChangeStatus) {
        Optional<ClinicDoctor> clinicDoctor=clinicDoctorRepository.findById(clinicDoctorDTO.getClinicDoctorId());
        if(clinicDoctor.isEmpty()){
           throw new ClinicDoctorNotFoundException("Không tìm thấy ClinicDoctor với ID:"+clinicDoctorDTO.getClinicDoctorId());
        }
        if(isChangeStatus==true){
            clinicDoctor.get().setActive(true);
            clinicDoctorRepository.save(clinicDoctor.get());
            return clinicDoctorUtil.entityToModel(clinicDoctor.get());
        }else{
            clinicDoctor.get().setActive(false);
            clinicDoctorRepository.save(clinicDoctor.get());
            ClinicDoctorDTO newClinicDoctorDTO=create(clinicDoctorDTO);
            return newClinicDoctorDTO;
        }
    }

    @Override
    public List<ClinicDoctorDTO> getAllDoctorsInClinic(Integer clinicId, boolean active) {
        if(!clinicRepository.existsById(clinicId)){
            throw new ClinicNotFoundException("Không tìm thấy clinic với ID:"+clinicId);
        }
        List<ClinicDoctor> clinicDoctors=clinicDoctorRepository.findByClinic_ClinicIdAndActive(clinicId,active);
        List<ClinicDoctorDTO> clinicDoctorDTOS=new ArrayList<>();
        for(ClinicDoctor clinicDoctor:clinicDoctors){
            clinicDoctorDTOS.add(clinicDoctorUtil.entityToModel(clinicDoctor));
        }
        return clinicDoctorDTOS;

    }

    @Override
    public List<ClinicDoctorDTO> getAllDoctorsInClinicBySpecialty(Integer clinicId, Integer specialtyId, boolean active) {
        if(!clinicRepository.existsById(clinicId)){
            throw new ClinicNotFoundException("Không tìm thấy clinic với ID:"+clinicId);
        }
        if(!specialtyRepository.existsById(specialtyId)){
            throw new SpecialtyNotFoundException("Không tìm thấy specialty với ID:"+specialtyId);
        }
        List<ClinicDoctor> clinicDoctors=clinicDoctorRepository.findByClinic_ClinicIdAndSpecialty_SpecialtyIdAndActive(clinicId,specialtyId,active);

        List<ClinicDoctorDTO> clinicDoctorDTOS=new ArrayList<>();
        for(ClinicDoctor clinicDoctor:clinicDoctors){
            clinicDoctorDTOS.add(clinicDoctorUtil.entityToModel(clinicDoctor));
        }
        return clinicDoctorDTOS;
    }

    @Override
    public List<ClinicDoctorDTO> getAllClinicsOfDoctor(Integer doctorId, boolean active) {
        if(doctorRepository.findByDoctorId(doctorId).isEmpty()){
            throw new DoctorIdNotFoundException("Không tìm thấy doctor với ID:"+doctorId);
        }
        List<ClinicDoctor> clinicDoctors=clinicDoctorRepository.findByDoctor_DoctorIdAndActive(doctorId,active);
        List<ClinicDoctorDTO> clinicDoctorDTOS=new ArrayList<>();
        for(ClinicDoctor clinicDoctor:clinicDoctors){
            clinicDoctorDTOS.add(clinicDoctorUtil.entityToModel(clinicDoctor));
        }
        return clinicDoctorDTOS;
    }
}
