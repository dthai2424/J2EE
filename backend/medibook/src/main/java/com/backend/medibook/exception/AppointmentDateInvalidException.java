package com.backend.medibook.exception;

public class AppointmentDateInvalidException extends RuntimeException {
    public AppointmentDateInvalidException(String message) {
        super(message);
    }
}
