package com.backend.medibook.service;

import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.Role;
import com.backend.medibook.entity.User;

import java.time.LocalDateTime;
import java.util.List;

public interface UserService {
    User create(UserDTO userDTO, String password);

    List<UserDTO> getAll();

    UserDTO getById(int id);

    UserDTO getByUsername(String username);

    List<UserDTO> getByNameContaining(String name,boolean active);


    UserDTO getByEmail(String email);

    List<UserDTO> getByEmailContaining(String email,boolean active);

    List<UserDTO> getByPhoneContaining(String phone,boolean active);

    UserDTO login(String username, String password);

    UserDTO register(UserDTO userDTO, String password);

    boolean changeStatus(int id,boolean active);

}
