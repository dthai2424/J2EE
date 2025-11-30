package com.backend.medibook.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicCareDTO {
    private int clinicCareId;

    private int clinicId;
    private int specialtyId;

    private ClinicDTO clinic;
    private SpecialtyDTO specialty;

    private String name;
    private String description;
    private long price;
    private boolean active=true;
}