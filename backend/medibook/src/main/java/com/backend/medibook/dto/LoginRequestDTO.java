package com.backend.medibook.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class LoginRequestDTO {
    private String username;
    private String password;
}
