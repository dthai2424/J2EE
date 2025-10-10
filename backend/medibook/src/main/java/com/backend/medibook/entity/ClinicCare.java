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
@Table(name = "clinic_services")
public class ClinicCare {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer clinicServiceId;

    @ManyToOne
    @JoinColumn(name="clinicId", nullable = false)
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "specialtyId", nullable = false)
    private Specialty specialty;

    @Pattern(regexp = "^[a-zA-Z0-9._-]$", message = "Tên chuyên khoa không hợp lệ")
    private String name;

    private String description;

    @Positive(message="Giá phải là số dương")
    private long price;

    private boolean active=true;
}
