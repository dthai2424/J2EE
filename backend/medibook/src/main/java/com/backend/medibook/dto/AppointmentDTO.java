package com.backend.medibook.dto;

import com.backend.medibook.entity.Status;
import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppointmentDTO {
    private int appointmentId;


    private int patientId;
    private int clinicDoctorId;
    private int clinicCareId;
    private int slotId;


    private UserDTO patient;
    private ClinicDTO clinic;
    private DoctorDTO doctor;
    private ClinicCareDTO clinicCare;
    private SlotDTO slot;

    private LocalDateTime createdAt;
    private LocalDateTime appointmentDate;

    @Builder.Default
    private Status status = Status.PENDING;

    private boolean active=true;
}