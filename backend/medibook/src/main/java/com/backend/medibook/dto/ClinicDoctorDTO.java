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


    private ClinicDTO clinic;
    private DoctorDTO doctor;
    private SpecialtyDTO specialty;
    // ----------------------------------------------------

    private boolean active=true;
}