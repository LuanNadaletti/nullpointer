package com.nullpointer.service;

import com.nullpointer.domain.mapper.UserMapper;
import com.nullpointer.domain.user.*;
import com.nullpointer.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDTO register(RegistrationRequest registrationRequest) {
        User user = userMapper.fromRegistrationRequest(registrationRequest);
        user.setRegistrationDate(new Date());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(new Role(1L));

        user = userRepository.save(user);

        return userMapper.fromEntity(user);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).get();
        user.setUsername(userDTO.getUsername());
        userRepository.save(user);
        return userMapper.fromEntity(user);
    }

    public UserDTO findById(long id) {
        User user = userRepository.findById(id).get();
        return userMapper.fromEntity(user);
    }

    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username).get();
        return userMapper.fromEntity(user);
    }

    public UserStatsDTO getUserActivityStats(Long userId) {
        return userRepository.findUserStatsDTO(userId);
    }
}
