package com.backend.medibook.exception;

public class ClinicNameInvalidException extends RuntimeException {
    public ClinicNameInvalidException(String message) {
        super(message);
    }
}
