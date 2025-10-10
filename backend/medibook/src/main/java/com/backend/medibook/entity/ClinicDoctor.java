package com.backend.medibook.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clinic_doctors",uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"clinicId", "doctorId", "specialtyId"}
        )
})
// Không cho bác sĩ + clinic + chuyên khoa trùng cùng lúc
public class ClinicDoctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer clinicDoctorId;

    @ManyToOne
    @JoinColumn(name = "clinicId", nullable = false)
    private Clinic clinic;

    @ManyToOne
    @JoinColumn(name = "doctorId", nullable = false)
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "specialtyId", nullable = false)
    private Specialty specialty;

    private boolean active=true;
}
