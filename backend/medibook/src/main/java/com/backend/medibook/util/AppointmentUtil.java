package com.backend.medibook.util;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.entity.*;
import org.springframework.stereotype.Component;

@Component
public class AppointmentUtil {
    public AppointmentDTO entityToModel(Appointment appointment){
        return AppointmentDTO.builder()
                .appointmentId(appointment.getAppointmentId())
                .patientId(appointment.getUser().getUserId())
                .clinicDoctorId(appointment.getClinicDoctor().getClinicDoctorId())
                .clinicCareId(appointment.getClinicCare().getClinicCareId())
                .slotId(appointment.getSlot().getSlotId())
                .createdAt(appointment.getCreatedAt())
                .appointmentDate(appointment.getAppointmentDate())
                .status(appointment.getStatus())
                .active(appointment.isActive())
                .build();
    }
    public Appointment modelToEntity(AppointmentDTO appointmentDTO, User patient, ClinicDoctor clinicDoctor, ClinicCare clinicCare, Slot slot){
        return Appointment.builder()
                .appointmentId(appointmentDTO.getAppointmentId())
                .user(patient)
                .clinicDoctor(clinicDoctor)
                .clinicCare(clinicCare)
                .slot(slot)
                .appointmentDate(appointmentDTO.getAppointmentDate())
                .status(appointmentDTO.getStatus())
                .active(appointmentDTO.isActive())
                .build();
    }
}
