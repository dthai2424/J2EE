package com.backend.medibook.exception;

public class ClinicCareNotFoundException extends RuntimeException {
    public ClinicCareNotFoundException(String message) {
        super(message);
    }
}
