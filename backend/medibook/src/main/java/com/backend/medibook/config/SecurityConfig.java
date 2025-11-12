package com.backend.medibook.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.backend.medibook.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // Tự động @Autowired các trường final
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Đã được định nghĩa ở UserUtil.java

    /**
     * Cấu hình CORS (Cross-Origin Resource Sharing)
     * (Giữ nguyên như cũ)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173", "*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * Cung cấp UserDetailsService:
     * Spring Security cần bean này để biết cách tải User từ database
     * (sử dụng trong JwtAuthFilter và AuthenticationProvider).
     */
    @Bean
    public UserDetailsService userDetailsService() {
        // Sử dụng UserRepository để tìm User (vì User đã implement UserDetails)
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }

    /**
     * Cung cấp AuthenticationProvider:
     * Bean này chịu trách nhiệm xác thực (ví dụ: kiểm tra password).
     * Mặc dù JWT không dùng password, bean này vẫn cần thiết.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder); // Dùng PasswordEncoder đã định nghĩa
        return authProvider;
    }

    /**
     * Cấu hình SecurityFilterChain: Bảo mật các endpoint và áp dụng CORS.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Kích hoạt CORS và Tắt CSRF (như cũ)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())

                // 2. Cấu hình ủy quyền (Authorization) - ĐÃ CẬP NHẬT
                .authorizeHttpRequests(authorize -> authorize
                        // Cho phép truy cập không cần xác thực vào các endpoint Auth
                        .requestMatchers(
                                "/api/user/register",
                                "/api/user/login"
                                // Thêm các API public khác nếu có (ví dụ: xem danh sách clinic)
                        ).permitAll()

                        // BẮT BUỘC: Tất cả các request khác PHẢI được xác thực
                        .anyRequest().authenticated()
                )

                // 3. Cấu hình Quản lý Phiên (Session Management)
                // Yêu cầu Spring Security không tạo session (STATELESS), vì chúng ta dùng JWT
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 4. Cung cấp AuthenticationProvider (đã định nghĩa ở trên)
                .authenticationProvider(authenticationProvider())

                // 5. Thêm Bộ lọc JWT (JwtAuthFilter)
                // Yêu cầu bộ lọc JWT chạy TRƯỚC bộ lọc UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}