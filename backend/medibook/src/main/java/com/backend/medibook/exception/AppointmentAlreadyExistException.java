package com.backend.medibook.exception;

public class AppointmentAlreadyExistException extends RuntimeException {
    public AppointmentAlreadyExistException(String message) {
        super(message);
    }
}
