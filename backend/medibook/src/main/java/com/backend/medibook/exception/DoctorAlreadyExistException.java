package com.backend.medibook.exception;

public class DoctorAlreadyExistException extends RuntimeException {
    public DoctorAlreadyExistException(String message) {
        super(message);
    }
}
