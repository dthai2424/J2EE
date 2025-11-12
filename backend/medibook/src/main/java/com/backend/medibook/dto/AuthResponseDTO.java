package com.backend.medibook.dto;

import lombok.*;

/**
 * Data Transfer Object (DTO) để trả về khi xác thực (đăng nhập/đăng ký) thành công.
 * Nó chứa cả JWT token và thông tin cơ bản của người dùng.
 */
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {

    // Mã JWT (JSON Web Token)
    private String accessToken;

    // Thông tin người dùng (từ UserDTO)
    private UserDTO user;

    // Loại token (Tiêu chuẩn là "Bearer")
    @Builder.Default
    private String tokenType = "Bearer";
}