package com.backend.medibook.exception;

public class UserNameInvalidException extends RuntimeException {
    public UserNameInvalidException(String message) {
        super(message);
    }
}
