package com.backend.medibook.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class DoctorDTO {
    private int doctorId;
    private UserDTO user;
    private String licenseNumber;
    private LocalDateTime careerStartDate;
    private boolean active;

}
