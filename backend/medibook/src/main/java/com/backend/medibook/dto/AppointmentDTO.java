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
    private LocalDateTime createdAt;
    private LocalDateTime appointmentDate;
    private Status status= Status.PENDING;
    private boolean active;
}
