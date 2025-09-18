package com.backend.medibook.exception;

public class DoctorIdNotFoundException extends RuntimeException {
    public DoctorIdNotFoundException(String message) {
        super(message);
    }
}
