package com.backend.medibook.util;

import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {
    public boolean validateEmail(String email){
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }
    public boolean validatePhone(String phoneNumber){
        String phoneRegex = "^\\+?[1-9][0-9]{7,14}$";
        return phoneNumber.matches(phoneRegex);
    }
    public boolean validatePassword(String password){
        String passwordRegex = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$";

        return password.matches(passwordRegex);
    }
    public UserDTO entityToModel(User user){
        UserDTO userDTO= UserDTO.builder().name(user.getName()).email(user.getEmail()).phoneNumber(user.getPhoneNumber()).role(user.getRole()).active(user.isActive()).build();
        return userDTO;
    }
    public User modelToEntity(UserDTO userDTO){
        User user= User.builder().name(userDTO.getName()).email(userDTO.getEmail()).phoneNumber(userDTO.getPhoneNumber()).role(userDTO.getRole()).active(userDTO.isActive()).build();
        return user;
    }
    public boolean validateUsername(String username){
        String usernameRegex="^[a-zA-Z0-9._-]+$";
        return username.matches(usernameRegex);
    }
    public boolean validateName(String name){
        String usernameRegex="^[\\p{L} .'-]+$";
        return name.matches(usernameRegex);
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
