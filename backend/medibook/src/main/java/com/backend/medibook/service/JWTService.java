package com.backend.medibook.service;

import com.backend.medibook.entity.User;
import io.jsonwebtoken.Claims;
import java.util.Map;
import java.util.function.Function;

/**
 * Service để quản lý việc tạo, xác thực và giải mã JSON Web Token (JWT).
 */
public interface JWTService {

    /**
     * Tạo JWT dựa trên thông tin người dùng.
     * @param user Đối tượng User cần tạo token.
     * @return Mã JWT (String).
     */
    String generateToken(User user);

    /**
     * Tạo JWT với các claims bổ sung (ví dụ: role, custom data).
     * @param extraClaims Các claims bổ sung.
     * @param user Đối tượng User.
     * @return Mã JWT (String).
     */
    String generateToken(Map<String, Object> extraClaims, User user);

    /**
     * Lấy Username (subject) từ JWT.
     * @param token Mã JWT.
     * @return Username.
     */
    String extractUsername(String token);

    /**
     * Lấy một Claim cụ thể từ Token.
     * <T> là khai báo Generic type cho phương thức này.
     * @param token Mã JWT.
     * @param claimsResolver Hàm phân giải Claims.
     * @return Giá trị của Claim.
     */
    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    /**
     * Kiểm tra tính hợp lệ của Token.
     * @param token Mã JWT.
     * @param user Đối tượng User để so sánh.
     * @return True nếu token hợp lệ và chưa hết hạn.
     */
    boolean isTokenValid(String token, User user);
}