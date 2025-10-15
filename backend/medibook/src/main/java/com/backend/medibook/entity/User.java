package com.backend.medibook.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;


import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Pattern(regexp = "^[a-zA-Z0-9._-]+$", message = "Username không hợp lệ")
    @Column(nullable =false, unique=true)
    private String username;

    @Column(nullable=false)
    private String password;;

    private String name;

    @Email(message="Email phải hợp lệ")
    @Column(nullable=false, unique=true)
    private String email;

    @Pattern(regexp = "^(0|\\+84)(\\d{9})$", message = "Số điện thoại không hợp lệ")
    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Enumerated(EnumType.STRING)
    private Role role=Role.Patient;

    @Column(nullable = false)
    private boolean active = true;
}
