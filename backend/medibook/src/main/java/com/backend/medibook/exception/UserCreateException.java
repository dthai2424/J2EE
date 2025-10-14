package com.backend.medibook.exception;

public class UserCreateException extends RuntimeException {
    public UserCreateException(String message) {
        super(message);
    }
}
