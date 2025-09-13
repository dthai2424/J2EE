package com.backend.medibook.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "specialties")
public class Specialty {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int specialtyId;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    private boolean active=true;
}
