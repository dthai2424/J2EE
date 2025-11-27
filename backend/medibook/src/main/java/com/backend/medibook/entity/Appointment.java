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

@Table(name = "appointments", uniqueConstraints = {
        @UniqueConstraint(
                columnNames = {"clinicDoctorId", "slotId", "appointmentDate"}

        )
})
public class Appointment {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer appointmentId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "clinicDoctorId", nullable = false)
    private ClinicDoctor clinicDoctor;

    @ManyToOne
    @JoinColumn(name = "clinicCareId", nullable = false)
    private ClinicCare clinicCare;

    @OneToOne
    @JoinColumn(name = "slotId", nullable = false)
    private Slot slot;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @Column(nullable = false)
    private LocalDateTime appointmentDate;

    @Enumerated(EnumType.STRING)
    private Status status;

    private boolean active = true;

}

