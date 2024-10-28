package com.nullpointer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nullpointer.domain.user.JwtRequest;
import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.security.JwtTokenUtil;
import com.nullpointer.service.CustomUserDetailsService;
import com.nullpointer.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.not;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean(name = "customUserDetailsService")
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private JwtTokenUtil jwtTokenUtil;

    @MockBean
    private UserService userService;

    @Test
    public void testRegisterUser() throws Exception {
        RegistrationRequest registrationRequest = new RegistrationRequest("testuser", "password", "test@example.com");

        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userService.register(eq(registrationRequest))).thenReturn(new UserDTO(1L));

        mockMvc.perform(post("/users/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(registrationRequest)))
                .andExpect(status().isCreated())
                .andExpect(content().string("User registered successfully"));

        verify(userService, times(1)).register(eq(registrationRequest));
    }

    @Test
    public void testCreateAuthenticationTokenSuccess() throws Exception {
        JwtRequest authenticationRequest = new JwtRequest("testuser", "password");

        UserDetails userDetails = mock(UserDetails.class);
        when(userDetails.getUsername()).thenReturn(authenticationRequest.username());
        when(customUserDetailsService.loadUserByUsername(authenticationRequest.username())).thenReturn(userDetails);
        when(jwtTokenUtil.generateToken(userDetails)).thenReturn("fake-jwt-token");
        when(userService.findByUsername(authenticationRequest.username())).thenReturn(new UserDTO(1L));

        mockMvc.perform(post("/users/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authenticationRequest)))
                .andExpect(status().isOk())
                .andExpect(content().string(not("Incorrect username or password")));

        verify(authenticationManager).authenticate(any());
        verify(customUserDetailsService).loadUserByUsername(eq(authenticationRequest.username()));
        verify(jwtTokenUtil).generateToken(userDetails);
    }


    @Test
    public void shouldReturnUnauthorizedWhenAuthenticationFails() throws Exception {
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
