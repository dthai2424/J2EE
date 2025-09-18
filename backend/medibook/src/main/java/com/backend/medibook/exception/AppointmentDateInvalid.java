package com.backend.medibook.exception;

public class AppointmentDateInvalid extends RuntimeException {
    public AppointmentDateInvalid(String message) {
        super(message);
    }
}
