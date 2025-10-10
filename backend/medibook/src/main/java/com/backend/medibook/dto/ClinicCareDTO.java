package com.backend.medibook.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicCareDTO {
    private int clinicServiceId;
    private int clinicId;
    private int specialtyId;
    private String name;
    private String description;
    private long price;
    private boolean active;
}
