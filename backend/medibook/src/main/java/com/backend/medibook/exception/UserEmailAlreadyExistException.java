package com.backend.medibook.exception;

public class UserEmailAlreadyExistException extends RuntimeException{
    public UserEmailAlreadyExistException(String message) {
        super(message);;
    }
}
