package com.backend.medibook.exception;

public class ClinicEmailInvalidException extends RuntimeException {
    public ClinicEmailInvalidException(String message) {
        super(message);
    }
}
