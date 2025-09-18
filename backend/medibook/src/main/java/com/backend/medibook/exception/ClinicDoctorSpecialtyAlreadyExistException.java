package com.backend.medibook.exception;

public class ClinicDoctorSpecialtyAlreadyExistException extends RuntimeException {
    public ClinicDoctorSpecialtyAlreadyExistException(String message) {
        super(message);
    }
}
