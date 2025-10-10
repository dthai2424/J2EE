package com.backend.medibook.entity;

import jakarta.persistence.*;
import lombok.*;


import java.time.LocalDateTime;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer doctorId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false, unique = true)
    private User user;

    private LocalDateTime careerStartDate;

    @Column(nullable = false, unique = true)
    private String licenseNumber;

    private boolean active=true;
}
