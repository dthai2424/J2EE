package com.backend.medibook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "specialties")
public class Specialty {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer specialtyId;


    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    private boolean active=true;
}
