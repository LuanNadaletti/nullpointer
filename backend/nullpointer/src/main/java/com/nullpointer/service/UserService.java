package com.nullpointer.service;

import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.Role;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
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

    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username).get();
        return modelMapper.map(user, UserDTO.class);
    }
}
