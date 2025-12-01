package com.nullpointer.service;

import com.nullpointer.domain.mapper.UserMapper;
import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.Role;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserMapper userMapper;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenValidRegistrationRequest_thenUserShouldBeRegistered() {
        // Arrange
        RegistrationRequest registrationRequest = new RegistrationRequest("testuser", "password", "test@example.com");

        User mappedUser = new User();
        mappedUser.setUsername("testuser");
        mappedUser.setPassword("password");
        mappedUser.setEmail("test@example.com");

        User savedUser = createSampleUser();

        when(userMapper.fromRegistrationRequest(registrationRequest)).thenReturn(mappedUser);
        when(passwordEncoder.encode(eq("password"))).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        UserDTO result = userService.register(registrationRequest);

        assertNotNull(result);
        assertEquals("testuser", result.getUsername());
        assertEquals("test@example.com", result.getEmail());
        assertNotNull(result.getRegistrationDate());

        verify(userMapper, times(1)).fromRegistrationRequest(registrationRequest);
        verify(passwordEncoder, times(1)).encode(eq("password"));
        verify(userRepository, times(1)).save(any(User.class));
    }

    private User createSampleUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("encodedPassword");
        user.setEmail("test@example.com");
        user.setRole(new Role(1L));
        user.setRegistrationDate(new Date());
        return user;
    }
}
