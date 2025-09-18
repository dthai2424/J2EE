package com.backend.medibook.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Pattern(regexp = "^[a-zA-Z0-9._-]$", message = "Username không hợp lệ")
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
    private Role role;

    @Column(nullable = false)
    private boolean active = true;
}
