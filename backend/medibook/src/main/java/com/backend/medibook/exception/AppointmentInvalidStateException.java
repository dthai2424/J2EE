package com.backend.medibook.exception;

public class AppointmentInvalidStateException extends RuntimeException {
    public AppointmentInvalidStateException(String message) {
        super(message);
    }
}
