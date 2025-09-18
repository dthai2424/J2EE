package com.backend.medibook.exception;

public class UserPhoneInvalidException extends RuntimeException {
    public UserPhoneInvalidException(String message) {
        super(message);
    }
}
