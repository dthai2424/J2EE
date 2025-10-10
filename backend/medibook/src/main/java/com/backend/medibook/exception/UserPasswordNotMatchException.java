package com.backend.medibook.exception;

public class UserPasswordNotMatchException extends RuntimeException {
    public UserPasswordNotMatchException(String message) {
        super(message);
    }
}
