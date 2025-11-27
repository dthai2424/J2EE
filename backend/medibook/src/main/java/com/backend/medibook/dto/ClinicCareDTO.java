package com.backend.medibook.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicCareDTO {
    private int clinicCareId;

    // Input IDs
    private int clinicId;
    private int specialtyId;

    // Output Objects (Thêm mới)
    private ClinicDTO clinic;
    private SpecialtyDTO specialty;

    private String name;
    private String description;
    private long price;
    private boolean active=true;
}