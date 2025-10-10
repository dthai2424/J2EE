package com.backend.medibook.exception;

public class UserEmailInvalidException extends RuntimeException {
    public UserEmailInvalidException(String message) {
        super(message);
    }
}
