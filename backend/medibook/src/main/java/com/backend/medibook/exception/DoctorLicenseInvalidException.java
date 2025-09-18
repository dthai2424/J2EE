package com.backend.medibook.exception;

public class DoctorLicenseInvalidException extends RuntimeException {
    public DoctorLicenseInvalidException(String message) {
        super(message);
    }
}
