package com.backend.medibook.controller;

import com.backend.medibook.dto.AuthResponseDTO;
import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.dto.LoginRequestDTO;
import com.backend.medibook.dto.RegisterRequestDTO;
import com.backend.medibook.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // === ĐĂNG NHẬP VÀ ĐĂNG KÝ ===

    /**
     * Endpoint để đăng ký người dùng mới.
     * Nhận vào một UserDTO (thông tin) và một password.
     * @param request Đối tượng chứa UserDTO và password.
     * @return UserDTO của người dùng vừa được tạo.
     */
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@RequestBody RegisterRequestDTO request) {
        // GlobalExceptionHandler sẽ xử lý lỗi validation/conflict
        System.out.println("register!!!!!!");
        UserDTO newUser = userService.register(request.getUserDTO(), request.getPassword());
        return ResponseEntity.ok(newUser);
    }

    /**
     * Endpoint để đăng nhập.
     * @param request Đối tượng chứa username và password.
     * @return UserDTO của người dùng nếu đăng nhập thành công.
     */

    @PostMapping("/login")
    // DÒNG NÀY ĐÃ ĐÚNG: Trả về ResponseEntity<AuthResponseDTO>
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request) {

        // DÒNG NÀY ĐÃ ĐÚNG: Gọi userService.login và nhận về AuthResponseDTO
        AuthResponseDTO response = userService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    // === LẤY THÔNG TIN USER ===

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAll();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") int id) {
        // GlobalExceptionHandler sẽ bắt UserNotFoundException (404)
        UserDTO user = userService.getById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<UserDTO> getUserByUsername(@PathVariable String username) {
        // GlobalExceptionHandler sẽ bắt UserNotFoundException (404)
        UserDTO user = userService.getByUsername(username);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        // GlobalExceptionHandler sẽ bắt UserNotFoundException (404)
        UserDTO user = userService.getByEmail(email);
        return ResponseEntity.ok(user);
    }

    // === TÌM KIẾM USER ===

    @GetMapping("/search/name")
    public ResponseEntity<List<UserDTO>> searchUserByName(
            @RequestParam String name,
            @RequestParam(defaultValue = "true") boolean active) {
        List<UserDTO> users = userService.getByNameContaining(name, active);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search/email")
    public ResponseEntity<List<UserDTO>> searchUserByEmail(
            @RequestParam String email,
            @RequestParam(defaultValue = "true") boolean active) {
        List<UserDTO> users = userService.getByEmailContaining(email, active);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/search/phone")
    public ResponseEntity<List<UserDTO>> searchUserByPhone(
            @RequestParam String phone,
            @RequestParam(defaultValue = "true") boolean active) {
        List<UserDTO> users = userService.getByPhoneContaining(phone, active);
        return ResponseEntity.ok(users);
    }

    // === CẬP NHẬT USER ===

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateUser(
            @PathVariable("id") int id,
            @RequestBody UserDTO userDTO) {
        // GlobalExceptionHandler sẽ bắt các lỗi 404, 400, 409
        userService.update(id, userDTO);
        return ResponseEntity.ok().build(); // Trả về 200 OK không có body
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Void> changeUserStatus(
            @PathVariable("id") int id,
            @RequestParam boolean active) {
        // GlobalExceptionHandler sẽ bắt UserNotFoundException (404)
        userService.changeStatus(id, active);
        return ResponseEntity.ok().build(); // Trả về 200 OK không có body
    }
}