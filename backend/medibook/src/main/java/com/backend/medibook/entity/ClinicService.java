package com.backend.medibook.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clinic_services")
public class ClinicService {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer clinicServiceId;

    @ManyToOne
    @JoinColumn(name = "specialtyId", nullable = false)
    private Specialty specialty;

    private String name;

    private String description;

    private int price;

    private boolean active=true;
}
