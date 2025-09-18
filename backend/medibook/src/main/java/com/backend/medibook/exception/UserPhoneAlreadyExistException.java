package com.backend.medibook.exception;

public class UserPhoneAlreadyExistException extends RuntimeException{
    public UserPhoneAlreadyExistException(String message) {
        super(message);
    }
}
