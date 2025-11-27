package com.backend.medibook.util;

import com.backend.medibook.dto.AppointmentDTO;
import com.backend.medibook.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentUtil {

    // Inject các Util khác để dùng hàm entityToModel của chúng
    @Autowired
    private UserUtil userUtil;

    @Autowired
    private ClinicUtil clinicUtil;

    @Autowired
    private DoctorUtil doctorUtil;

    @Autowired
    private ClinicCareUtil clinicCareUtil;

    @Autowired
    private SlotUtil slotUtil;

    public AppointmentDTO entityToModel(Appointment appointment) {
        // 1. Lấy các Entity liên quan từ quan hệ trong Appointment
        // Appointment -> User
        User patientEntity = appointment.getUser();

        // Appointment -> ClinicDoctor -> Clinic / Doctor
        ClinicDoctor clinicDoctorEntity = appointment.getClinicDoctor();
        Clinic clinicEntity = clinicDoctorEntity.getClinic();
        Doctor doctorEntity = clinicDoctorEntity.getDoctor();

        // Appointment -> ClinicCare
        ClinicCare careEntity = appointment.getClinicCare();

        // Appointment -> Slot
        Slot slotEntity = appointment.getSlot();

        // 2. Map sang DTO
        return AppointmentDTO.builder()
                .appointmentId(appointment.getAppointmentId())

                // --- Map ID (Giữ logic cũ cho Input/Reference) ---
                .patientId(patientEntity.getUserId())
                .clinicDoctorId(clinicDoctorEntity.getClinicDoctorId())
                .clinicCareId(careEntity.getClinicCareId())
                .slotId(slotEntity.getSlotId())

                // --- Map Object Chi Tiết (Logic Mới cho Frontend hiển thị) ---
                .patient(userUtil.entityToModel(patientEntity))
                .clinic(clinicUtil.entityToModel(clinicEntity))
                .doctor(doctorUtil.entityToModel(doctorEntity))
                .clinicCare(clinicCareUtil.entityToModel(careEntity))
                .slot(slotUtil.entityToModel(slotEntity))
                // ----------------------------------------------------------

                .createdAt(appointment.getCreatedAt())
                .appointmentDate(appointment.getAppointmentDate())
                .status(appointment.getStatus())
                .active(appointment.isActive())
                .build();
    }

    public Appointment modelToEntity(AppointmentDTO appointmentDTO, User patient, ClinicDoctor clinicDoctor, ClinicCare clinicCare, Slot slot) {
        // Logic này giữ nguyên vì khi lưu xuống DB ta dùng các Entity đã được tìm thấy bởi Service
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