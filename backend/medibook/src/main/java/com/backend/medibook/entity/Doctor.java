package com.backend.medibook.entity;

import jakarta.persistence.*;


import java.time.LocalDateTime;
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctorId;

    @OneToOne
    @JoinColumn(name = "userId", nullable = false, unique = true)
    private User user;

    private LocalDateTime careerStartDate;

    private String licenseNumber;

}
