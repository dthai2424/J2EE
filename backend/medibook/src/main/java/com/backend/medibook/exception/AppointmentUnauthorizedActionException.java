package com.backend.medibook.exception;

public class AppointmentUnauthorizedActionException extends RuntimeException {
    public AppointmentUnauthorizedActionException(String message) {
        super(message);
    }
}
