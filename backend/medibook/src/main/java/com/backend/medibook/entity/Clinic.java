package com.backend.medibook.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clinics")
public class Clinic {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer clinicId;

    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Tên không hợp lệ")
    @Column(nullable = false)
    private String name;

    @Pattern(regexp = "^(0|\\+84)(\\d{9})$", message = "Số điện thoại không hợp lệ")
    @Column(nullable = false)
    private String phoneNumber;

    @Email(message="Email phải hợp lệ")
    @NotBlank(message="Cần nhập email")
    @Column(nullable=false)
    private String email;

    private String address;

    @Column(nullable = false)
    private boolean active = true;
}
