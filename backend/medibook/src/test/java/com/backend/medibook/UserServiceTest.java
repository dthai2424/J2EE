package com.backend.medibook;

import com.backend.medibook.dto.UserDTO;
import com.backend.medibook.entity.Role;
import com.backend.medibook.entity.User;
import com.backend.medibook.repository.UserRepository;
import com.backend.medibook.service.UserServiceImpl;
import com.backend.medibook.util.UserUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class UserServiceSpringTest {

    @Autowired
    private UserServiceImpl userService; // service thật, UserUtil + PasswordEncoder thật

    @Mock
    private UserRepository userRepository; // Mockito mock

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // inject mock repository vào service
        ReflectionTestUtils.setField(userService, "userRepository", userRepository);
    }

    @Test
    void register_ShouldSaveUserAndReturnDTO() {
        UserDTO dto = UserDTO.builder()
                .username("hehe")
                .email("test@mail.com")
                .name("Nguyen Van A")
                .phoneNumber("+84768038421")
                .role(Role.Patient)
                .build();

        User savedUser = new User();
        savedUser.setUserId(1);
        savedUser.setUsername("hehe");

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        UserDTO result = userService.register(dto, "Abc@1234");

        assertNotNull(result);
        assertEquals("hehe", result.getUsername());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
