package com.backend.medibook.exception;

public class UserPhoneInvalid extends RuntimeException {
    public UserPhoneInvalid(String message) {
        super(message);
    }
}
