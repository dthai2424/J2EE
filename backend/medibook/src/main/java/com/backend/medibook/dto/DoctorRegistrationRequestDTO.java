package com.backend.medibook.dto;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DoctorRegistrationRequestDTO {
    private UserDTO userDTO;

    private String password;

    private String licenseNumber;
    private LocalDateTime careerStartDate;
}
