package com.backend.medibook.exception;

public class UsernameInvalid extends RuntimeException {
    public UsernameInvalid(String message) {
        super(message);
    }
}
