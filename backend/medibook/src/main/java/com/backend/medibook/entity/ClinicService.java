package com.backend.medibook.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "clinic_services")
public class ClinicService {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int clinicServiceId;

    @ManyToOne
    @JoinColumn(name = "specialtyId", nullable = false)
    private Specialty specialty;

    private String name;

    private String description;

    private int price;

    private boolean active=true;
}
