package com.nullpointer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nullpointer.domain.user.JwtRequest;
import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.security.JwtTokenUtil;
import com.nullpointer.security.SecurityConfig;
import com.nullpointer.service.CustomUserDetailsService;
import com.nullpointer.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Import(SecurityConfig.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userServices;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean(name = "customUserDetailsService")
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserService userService;

    @Test
    public void testRegisterUser() throws Exception {
        RegistrationRequest registrationRequest = new RegistrationRequest("testuser", "password", "test@example.com");

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");

        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registrationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("User registered successfully"));

        verify(userService, times(1)).register(any(RegistrationRequest.class));
    }

    @Test
    public void testCreateAuthenticationTokenSuccess() throws Exception {
        JwtRequest authenticationRequest = new JwtRequest("testuser", "password");

        UserDetails userDetails = mock(UserDetails.class);
        when(customUserDetailsService.loadUserByUsername("testuser")).thenReturn(userDetails);
        when(jwtTokenUtil.generateToken(userDetails)).thenReturn("fake-jwt-token");

        mockMvc.perform(post("/users/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string("fake-jwt-token"));

        verify(authenticationManager).authenticate(any());
        verify(customUserDetailsService).loadUserByUsername("testuser");
        verify(jwtTokenUtil).generateToken(userDetails);
    }

    @Test
    public void testCreateAuthenticationTokenFailure() throws Exception {
        JwtRequest authenticationRequest = new JwtRequest("testuser", "wrongpass");

        doThrow(new BadCredentialsException("Incorrect username or password"))
                .when(authenticationManager).authenticate(any());

        mockMvc.perform(post("/users/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authenticationRequest)))
                .andExpect(status().isUnauthorized());

        verify(authenticationManager).authenticate(any());
        verify(customUserDetailsService, never()).loadUserByUsername(anyString());
        verify(jwtTokenUtil, never()).generateToken(any(UserDetails.class));
    }
}
