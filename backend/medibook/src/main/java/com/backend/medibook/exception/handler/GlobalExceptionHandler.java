package com.backend.medibook.exception.handler;

import com.backend.medibook.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // --- 404 NOT FOUND ---
    // Xử lý các lỗi không tìm thấy tài nguyên
    @ExceptionHandler({
            AppointmentNotFoundException.class,
            ClinicCareNotFoundException.class,
            ClinicDoctorNotFoundException.class,
            ClinicNotFoundException.class,
            DoctorIdNotFoundException.class,
            SlotNotFoundException.class,
            SpecialtyNotFoundException.class,
            UserNotFoundException.class
    })
    public ResponseEntity<String> handleNotFoundExceptions(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // --- 400 BAD REQUEST ---
    // Xử lý các lỗi liên quan đến dữ liệu đầu vào không hợp lệ từ người dùng
    @ExceptionHandler({
            AppointmentDateInvalidException.class,
            AppointmentInvalidStateException.class,
            ClinicAddressInvalidException.class,
            ClinicCareNameInvalidException.class,
            ClinicCarePriceInvalidException.class,
            ClinicEmailInvalidException.class,
            ClinicNameInvalidException.class,
            ClinicPhoneInvalidException.class,
            DoctorCareerStartInvalidException.class,
            DoctorLicenseInvalidException.class,
            SlotInvalidException.class,
            SpecialtyNameInvalidException.class,
            UserEmailInvalidException.class,
            UserNameInvalidException.class,
            UserPasswordInvalidException.class,
            UserPhoneInvalidException.class,
            UserUsernameInvalidException.class
    })
    public ResponseEntity<String> handleInvalidInputExceptions(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // --- 409 CONFLICT ---
    // Xử lý các lỗi xung đột tài nguyên (ví dụ: đã tồn tại)
    @ExceptionHandler({
            AppointmentAlreadyExistException.class,
            ClinicDoctorAlreadyExistException.class,
            DoctorAlreadyExistException.class,
            UserEmailAlreadyExistException.class,
            UserPhoneAlreadyExistException.class
    })
    public ResponseEntity<String> handleConflictExceptions(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    /*
     * Xử lý đặc biệt cho UsernameNotFoundException.
     * Trong UserServiceImpl, exception này được ném ra khi "Username đã tồn tại" (lúc tạo user),
     * điều này nên được coi là lỗi CONFLICT (409) thay vì NOT_FOUND (404).
     * Lưu ý: Nếu bạn dùng exception này ở chỗ khác (ví dụ: lúc đăng nhập) với ý nghĩa "không tìm thấy",
     * thì cần phải tách biệt logic xử lý.
     */
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<String> handleUsernameConflict(UsernameNotFoundException ex, WebRequest request) {
        // Giả định rằng nếu exception này được ném từ service, nó có nghĩa là "đã tồn tại"
        if (ex.getMessage().contains("đã tồn tại")) {
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
        }
        // Nếu dùng cho đăng nhập, nó nên là 401 hoặc 404, nhưng ở đây ta ưu tiên cho logic service
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }


    // --- 401 UNAUTHORIZED ---
    // Xử lý các lỗi liên quan đến xác thực (đăng nhập thất bại)
    @ExceptionHandler({
            UserPasswordNotMatchException.class,
            UserNotActiveException.class
    })
    public ResponseEntity<String> handleAuthenticationExceptions(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    // --- 403 FORBIDDEN ---
    // Xử lý lỗi từ chối truy cập (không có quyền)
    @ExceptionHandler(AppointmentUnauthorizedActionException.class)
    public ResponseEntity<String> handleForbiddenExceptions(RuntimeException ex, WebRequest request) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.FORBIDDEN);
    }

    // --- 500 INTERNAL SERVER ERROR ---
    // Xử lý các lỗi nội bộ của server không mong muốn
    @ExceptionHandler({
            UserCreateException.class,
            Exception.class // Bắt tất cả các lỗi khác
    })
    public ResponseEntity<String> handleInternalServerErrors(Exception ex, WebRequest request) {
        // Che giấu lỗi chi tiết khỏi người dùng cuối
        return new ResponseEntity<>("Đã có lỗi xảy ra ở máy chủ, vui lòng thử lại sau.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}