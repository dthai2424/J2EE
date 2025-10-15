package com.backend.medibook.service;

import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.Role;
import com.backend.medibook.entity.User;
import com.backend.medibook.exception.*;
import com.backend.medibook.repository.UserRepository;
import com.backend.medibook.util.UserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserUtil userUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO create(UserDTO userDTO, String password){
        userDTO.setUsername(userDTO.getUsername().toLowerCase());
        userDTO.setEmail(userDTO.getEmail().toLowerCase());
         userDTO.setName(userDTO.getName().toLowerCase());

        if(!userUtil.validateEmail(userDTO.getEmail())){
            throw new UserEmailInvalidException("Email user không hợp lệ");
        }
        if(userRepository.existsByEmail(userDTO.getEmail())){
            throw new UserEmailAlreadyExistException("Email user đã tồn tại");
        }
        if(!userUtil.validateUsername(userDTO.getUsername())){
            throw new UserNameInvalidException("Username không hợp lệ");
        }
        if(userRepository.existsByUsername(userDTO.getUsername())){
            throw new UsernameNotFoundException("Username đã tồn tại");
        }
        if(!userUtil.validateName(userDTO.getName())){
            throw new UserNameInvalidException("Tên user không hợp lệ");
        }
        if(!userUtil.validatePhone(userDTO.getPhoneNumber())){
            throw new UserPhoneInvalidException("Số điện thoại user không hợp lệ");
        }
        if(userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())){
            throw new UserPhoneAlreadyExistException("Số điện thoại user đã tồn tại");
        }
        if(!userUtil.validatePassword(password)){
            throw new UserPasswordInvalidException("Mật khẩu phải ít nhất 8 kí tự, 1 số, hoa, thường, kí tự đặc biệt");
        }
        password=passwordEncoder.encode(password);
        User user=userUtil.modelToEntity(userDTO);
        user.setPassword(password);
        user=userRepository.save(user);
        if(user==null){
            throw new UserCreateException("Tạo user không thành công");
        }
        userDTO=userUtil.entityToModel(user);
        return userDTO;
    }
    public List<UserDTO> getAll(){
        List<User> users=userRepository.findAll();
        List<UserDTO> userDTOS=new ArrayList<>();
        for(User user:users){
            userDTOS.add(userUtil.entityToModel(user));
        }
        return userDTOS;
    }
    public UserDTO getById(int id){
        Optional<User> user=userRepository.findByUserId(id);
        if(user.isPresent()){
            UserDTO userDTO=userUtil.entityToModel(user.get());
            return userDTO;
        }else{
            throw new UserNotFoundException("Không tìm thấy user với id:"+id);
        }
    }
    public UserDTO getByUsername(String username){
        username=username.toLowerCase();
        Optional<User> user=userRepository.findByUsername(username);
        if(user.isPresent()){
            UserDTO userDTO=userUtil.entityToModel(user.get());
            return userDTO;
        }else{
            throw new UserNotFoundException("Không tìm thấy user với username này");
        }
    }
   public List<UserDTO> getByNameContaining(String name,boolean active){
        name=name.toLowerCase();
        List<User> users=userRepository.findByNameContainingAndActive(name,active);
        List<UserDTO> userDTOS=new ArrayList<>();
        for(User user:users){
            userDTOS.add(userUtil.entityToModel(user));
        }
        return userDTOS;
    }
    public UserDTO getByEmail(String email){
        email=email.toLowerCase();
        Optional<User> user=userRepository.findByEmail(email);
        if(user.isPresent()){
            UserDTO userDTO=userUtil.entityToModel(user.get());
            return userDTO;
        }else{
            throw new UserNotFoundException("Không tìm thấy user với email này");
        }
    }
    public List<UserDTO> getByEmailContaining(String email,boolean active){
        email=email.toLowerCase();
        List<User> users=userRepository.findByEmailContainingAndActive(email,active);
        List<UserDTO> userDTOS=new ArrayList<>();
        for(User user:users){
            userDTOS.add(userUtil.entityToModel(user));
        }
        return userDTOS;
    }





    public List<UserDTO> getByPhoneContaining(String phone,boolean active) {
        List<User> users=userRepository.findByPhoneNumberContainingAndActive(phone,active);
        List<UserDTO> userDTOS=new ArrayList<>();
        for(User user:users){
            userDTOS.add(userUtil.entityToModel(user));
        }
        return userDTOS;
    }

    public UserDTO login(String username, String password){
        username=username.toLowerCase();
        Optional<User> user=userRepository.findByUsername(username);
        if(user.isPresent()){
           boolean isPasswordMatch=passwordEncoder.matches(password,user.get().getPassword());
            if(isPasswordMatch){
                if(user.get().isActive()==false){
                    throw new UserNotActiveException("Tài khoản của bạn đã bị vô hiệu hóa");
                }
                UserDTO userDTO=userUtil.entityToModel(user.get());
                return userDTO;
            }else{
                throw new UserPasswordNotMatchException("Mật khẩu không đúng");            }
        }else{
            throw new UserNotFoundException("Không tìm thấy user với username này");
        }
    }

    public UserDTO register(UserDTO userDTO, String password){
        userDTO= create(userDTO,password);

        return userDTO;
    }

    // Chi cho update name email phonenumber
    public boolean update(int id ,UserDTO userDTO){
        Optional<User> user=userRepository.findById(id);
        if(user.isPresent()){
            UserDTO oldUser=userUtil.entityToModel(user.get());
            if(!userUtil.validateName(userDTO.getName())){
                throw new UserNameInvalidException("Tên user không hợp lệ");
            }
            oldUser.setName(userDTO.getName());
            if(!userUtil.validateEmail(userDTO.getEmail())){
                throw new UserEmailInvalidException("Email user không hợp lệ");
            }
            if(userRepository.existsByEmail(userDTO.getEmail())){
                throw new UserEmailAlreadyExistException("Email user đã tồn tại");
            }
            oldUser.setEmail(userDTO.getEmail());
            if(!userUtil.validatePhone(userDTO.getPhoneNumber())){
                throw new UserPhoneInvalidException("Số điện thoại user không hợp lệ");
            }
            if(userRepository.existsByPhoneNumber(userDTO.getPhoneNumber())){
                throw new UserPhoneAlreadyExistException("Số điện thoại user đã tồn tại");
            }
            oldUser.setPhoneNumber(userDTO.getPhoneNumber());
            userRepository.save(userUtil.modelToEntity(oldUser));
            return true;
        }else{
            throw new UserNotFoundException("Không tìm thấy user với id này");
        }
    }

    public boolean changeStatus(int id,boolean active){
        Optional<User> user=userRepository.findById(id);
        if(user.isPresent()){
            user.get().setActive(active);
            userRepository.save(user.get());
            return true;
        }else{
            throw new UserNotFoundException("Không tìm thấy user với id này");
        }
    }
}
