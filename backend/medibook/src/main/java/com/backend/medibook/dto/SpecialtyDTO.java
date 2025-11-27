package com.backend.medibook.dto;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SpecialtyDTO {
    private int specialtyId;
    private String name;
    private String description;
    private boolean active=true;
}
