package com.nullpointer.service;

import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.Role;
import com.nullpointer.domain.user.User;
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

    public User register(RegistrationRequest registrationRequest) {
        User user = modelMapper.map(registrationRequest, User.class);
        user.setRegistrationDate(new Date());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(new Role(1L));

        return userRepository.save(user);
    }
}
