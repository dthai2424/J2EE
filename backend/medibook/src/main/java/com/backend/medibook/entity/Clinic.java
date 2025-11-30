package com.backend.medibook.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "clinics")
public class Clinic {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Integer clinicId;


    @Column(nullable = false)
    private String name;


    @Column(nullable = false)
    private String phoneNumber;



    @Column(nullable=false)
    private String email;

    private String address;

    @Column(nullable = false)
    private boolean active = true;
}
