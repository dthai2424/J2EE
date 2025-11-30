package com.backend.medibook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clinic_cares")
public class ClinicCare {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer clinicCareId;

    @ManyToOne
    @JoinColumn(name="clinicId", nullable = false)
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "specialtyId", nullable = false)
    private Specialty specialty;


    private String name;

    private String description;


    private long price;

    private boolean active=true;
}
