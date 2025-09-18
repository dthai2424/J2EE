package com.backend.medibook.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specialties")
public class Specialty {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer specialtyId;

    @Pattern(regexp = "^[a-zA-Z0-9._-]$", message = "Username không hợp lệ")
    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    private boolean active=true;
}
