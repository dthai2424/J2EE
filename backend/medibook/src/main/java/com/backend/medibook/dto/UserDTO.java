package com.backend.medibook.dto;

import com.backend.medibook.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class UserDTO {
    private int userId;
    private String username;
    private String name;
    private String email;
    private String phoneNumber;
    private Role role;


}
