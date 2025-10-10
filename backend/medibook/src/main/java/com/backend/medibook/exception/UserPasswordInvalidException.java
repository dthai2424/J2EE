package com.backend.medibook.exception;

public class UserPasswordInvalidException extends RuntimeException {
    public UserPasswordInvalidException(String message) {
        super(message);
    }
}
