package com.backend.medibook.exception;

public class DoctorAlreadyExist extends RuntimeException {
    public DoctorAlreadyExist(String message) {
        super(message);
    }
}
