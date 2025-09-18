package com.backend.medibook.exception;

public class ClinicServiceNotFound extends RuntimeException {
    public ClinicServiceNotFound(String message) {
        super(message);
    }
}
