package com.backend.medibook.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ClinicDTO {
    private int clinicId;
    private String name;
    private String phoneNumber;
    private String email;
    private String address;
    private boolean active=true;
}
