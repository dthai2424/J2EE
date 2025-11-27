package com.backend.medibook.util;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentUtil {

    @Autowired private UserUtil userUtil;
    @Autowired private ClinicUtil clinicUtil;
    @Autowired private DoctorUtil doctorUtil;
    @Autowired private ClinicCareUtil clinicCareUtil;
    @Autowired private SlotUtil slotUtil;

    public AppointmentDTO entityToModel(Appointment appointment){
        ClinicDoctor clinicDoctor = appointment.getClinicDoctor();
        Clinic clinic = clinicDoctor.getClinic();
        Doctor doctor = clinicDoctor.getDoctor();
        ClinicCare care = appointment.getClinicCare();
        Slot slot = appointment.getSlot();
        User patient = appointment.getUser();

        return AppointmentDTO.builder()
                .appointmentId(appointment.getAppointmentId())
                .patientId(patient.getUserId())
                .clinicDoctorId(clinicDoctor.getClinicDoctorId())
                .clinicCareId(care.getClinicCareId())
                .slotId(slot.getSlotId())
                .patient(userUtil.entityToModel(patient))
                .clinic(clinicUtil.entityToModel(clinic))
                .doctor(doctorUtil.entityToModel(doctor))
                .clinicCare(clinicCareUtil.entityToModel(care))
                .slot(slotUtil.entityToModel(slot))
                .createdAt(appointment.getCreatedAt())
                .appointmentDate(appointment.getAppointmentDate())
                .status(appointment.getStatus())
                .active(appointment.isActive())
                .build();
    }

    public Appointment modelToEntity(AppointmentDTO appointmentDTO, User patient, ClinicDoctor clinicDoctor, ClinicCare clinicCare, Slot slot) {
        // SỬA LỖI TẠI ĐÂY:
        // Sử dụng builder nhưng KHÔNG set appointmentId nếu id <= 0 (trường hợp tạo mới)

        var builder = Appointment.builder()
                .user(patient)
                .clinicDoctor(clinicDoctor)
                .clinicCare(clinicCare)
                .slot(slot)
                .appointmentDate(appointmentDTO.getAppointmentDate())
                .status(appointmentDTO.getStatus())
                .active(appointmentDTO.isActive());

        // Chỉ set ID nếu đây là thao tác update (ID > 0)
        if (appointmentDTO.getAppointmentId() > 0) {
            builder.appointmentId(appointmentDTO.getAppointmentId());
        }

        return builder.build();
    }
}