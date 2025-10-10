package com.backend.medibook.exception;

public class UserUsernameInvalidException extends RuntimeException {
    public UserUsernameInvalidException(String message) {
        super(message);
    }
}
