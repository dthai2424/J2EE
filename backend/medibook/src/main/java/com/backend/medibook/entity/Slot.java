package com.backend.medibook.entity;

import jakarta.persistence.*;

import java.time.LocalTime;
@Entity
@Table(name = "slots")
public class Slot {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private int slotId;

    @Column(nullable = false)
    private LocalTime startTime;

    @Column(nullable = false)
    private LocalTime endTime;

    private boolean active=true;
}
