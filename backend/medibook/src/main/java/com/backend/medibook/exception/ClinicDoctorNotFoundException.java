package com.backend.medibook.exception;

public class ClinicDoctorNotFoundException extends RuntimeException {
    public ClinicDoctorNotFoundException(String message) {
        super(message);
    }
}
