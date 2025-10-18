package com.backend.medibook.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class RegisterRequestDTO {
    private UserDTO userDTO;
    private String password;
}
