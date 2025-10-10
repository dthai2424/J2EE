package com.backend.medibook.dto;

import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class SlotDTO {
    private int slotId;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean active;
}
