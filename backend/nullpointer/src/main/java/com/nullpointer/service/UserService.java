package com.nullpointer.service;

import com.nullpointer.domain.user.*;
import com.nullpointer.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO register(RegistrationRequest registrationRequest) {
        User user = modelMapper.map(registrationRequest, User.class);
        user.setRegistrationDate(new Date());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(new Role(1L));

        user = userRepository.save(user);

        return modelMapper.map(user, UserDTO.class);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id).get();
        user.setUsername(userDTO.getUsername());
        userRepository.save(user);
        return modelMapper.map(user, UserDTO.class);
    }

    public UserDTO findById(long id) {
        User user = userRepository.findById(id).get();
        return modelMapper.map(user, UserDTO.class);
    }

    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username).get();
        return modelMapper.map(user, UserDTO.class);
    }

    public UserStatsDTO getUserActivityStats(Long userId) {
        return userRepository.findUserStatsDTO(userId);
    }
}
