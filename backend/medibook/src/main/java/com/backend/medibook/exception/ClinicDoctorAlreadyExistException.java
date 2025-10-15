package com.backend.medibook.exception;

public class ClinicDoctorAlreadyExistException extends RuntimeException {
    public ClinicDoctorAlreadyExistException(String message) {
        super(message);
    }
}
