package com.backend.medibook.service;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.entity.ClinicCare;
import com.backend.medibook.entity.ClinicDoctor;
import com.backend.medibook.entity.Slot;
import com.backend.medibook.entity.User;
import com.backend.medibook.exception.ClinicCareNotFoundException;
import com.backend.medibook.exception.ClinicDoctorNotFoundException;
import com.backend.medibook.exception.SlotNotFoundException;
import com.backend.medibook.exception.UserNotFoundException;
import com.backend.medibook.repository.*;
import com.backend.medibook.util.AppointmentUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ClinicDoctorRepository clinicDoctorRepository;
    @Autowired
    private ClinicCareRepository clinicCareRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private AppointmentUtil appointmentUtil;

    @Override
    public AppointmentDTO create(AppointmentDTO appointmentDTO) {
        Optional<User> patient = userRepository.findById(appointmentDTO.getPatientId());
        Optional<ClinicDoctor> clinicDoctor= clinicDoctorRepository.findById(appointmentDTO.getClinicDoctorId());
        Optional<ClinicCare> clinicCare= clinicCareRepository.findById(appointmentDTO.getClinicCareId());
        Optional<Slot> slot= slotRepository.findById(appointmentDTO.getSlotId());
        if(!patient.isPresent()){
            throw new UserNotFoundException("Không tìm thấy user với id:"+appointmentDTO.getPatientId());
        }
        if(!clinicDoctor.isPresent()){
            throw new ClinicDoctorNotFoundException("Không tìm thấy clinicDoctor với id:"+appointmentDTO.getClinicDoctorId());
        }
        if(!clinicCare.isPresent()){
            throw new ClinicCareNotFoundException("Không tìm thấy clinicCare với id:"+appointmentDTO.getClinicCareId());
        }
        if(!slot.isPresent()){
            throw new SlotNotFoundException("Không tìm thấy slot với id:"+appointmentDTO.getSlotId());
        }

    }

    @Override
    public AppointmentDTO cancelAppointmentAsPatient(Integer appointmentId, Integer userId) {
        return null;
    }

    @Override
    public AppointmentDTO confirmAppointment(Integer appointmentId) {
        return null;
    }

    @Override
    public AppointmentDTO completeAppointment(Integer appointmentId) {
        return null;
    }

    @Override
    public AppointmentDTO cancelAppointmentAsAdmin(Integer appointmentId) {
        return null;
    }

    @Override
    public AppointmentDTO getAppointmentById(Integer appointmentId) {
        return null;
    }

    @Override
    public List<AppointmentDTO> findAppointmentsByUser(Integer userId) {
        return List.of();
    }

    @Override
    public List<AppointmentDTO> findAppointmentsByDoctorAndDate(Integer doctorId, LocalDate date) {
        return List.of();
    }
}
