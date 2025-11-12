package com.backend.medibook.config;

import com.backend.medibook.entity.User;
import com.backend.medibook.repository.UserRepository;
import com.backend.medibook.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor // Tự động @Autowired các trường final
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserRepository userRepository; // Cần để tải UserDetails

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Kiểm tra xem có Header "Authorization" và có bắt đầu bằng "Bearer " không
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response); // Không có token, cho qua
            return;
        }

        // 2. Tách lấy token (sau chữ "Bearer ")
        jwt = authHeader.substring(7);

        try {
            // 3. Giải mã token để lấy username
            username = jwtService.extractUsername(jwt);

            // 4. Kiểm tra nếu username tồn tại VÀ chưa có ai được xác thực trong SecurityContext
            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                // 5. Tải thông tin User từ Database
                // User entity đã implement UserDetails
                User userDetails = this.userRepository.findByUsername(username)
                        .orElseThrow(() -> new ServletException("User not found in filter"));

                // 6. Kiểm tra xem token có hợp lệ không
                if (jwtService.isTokenValid(jwt, userDetails)) {
                    // 7. TẠO PHIÊN XÁC THỰC
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null, // Không cần credentials (password) khi dùng token
                            userDetails.getAuthorities() // Lấy quyền (Role)
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // 8. Lưu phiên xác thực vào SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            // Nếu token hết hạn hoặc không hợp lệ, ném lỗi (GlobalExceptionHandler sẽ bắt)
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or Expired Token");
        }
    }
}