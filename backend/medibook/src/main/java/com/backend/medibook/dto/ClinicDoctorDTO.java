package com.backend.medibook.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClinicDoctorDTO {
    private int clinicDoctorId;

    // --- INPUT FIELDS (Giữ nguyên) ---
    private int clinicId;
    private int doctorId;
    private int specialtyId;

    // --- OUTPUT FIELDS (Thêm mới để hiển thị chi tiết) ---
    private ClinicDTO clinic;       // Thông tin phòng khám
    private DoctorDTO doctor;       // Thông tin bác sĩ (có tên, bằng cấp...)
    private SpecialtyDTO specialty; // Thông tin chuyên khoa (tên khoa)
    // ----------------------------------------------------

    private boolean active;
}