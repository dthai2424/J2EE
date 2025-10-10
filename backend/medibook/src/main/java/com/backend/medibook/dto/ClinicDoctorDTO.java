package com.backend.medibook.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicDoctorDTO {
    private int clinicDoctorId;
    private int clinicId;
    private int doctorId;
    private int specialtyId;
    private boolean active;
}
