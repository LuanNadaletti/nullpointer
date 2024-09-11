package com.nullpointer.controller;

import com.nullpointer.config.exception.UserAlreadyExistsException;
import com.nullpointer.domain.user.JwtRequest;
import com.nullpointer.domain.user.JwtResponse;
import com.nullpointer.domain.user.RegistrationRequest;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.service.AuthService;
import com.nullpointer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        UserDTO userDTO;
        try {
            userDTO = userService.register(registrationRequest);
        } catch (DataIntegrityViolationException e) {
            throw new UserAlreadyExistsException("Username " + registrationRequest.getUsername() + " is already taken.");
        }

        URI location = URI.create("/users/" + userDTO.getId());
        return ResponseEntity.created(location).body("User registered successfully");
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> login(@RequestBody JwtRequest authenticationRequest, HttpServletResponse response) {
        JwtResponse jwtResponse;
        try {
            jwtResponse = authService.authenticateUser(authenticationRequest);
        } catch (Exception e) {
            throw new BadCredentialsException("Incorrect username or password");
        }

        String jwtToken = jwtResponse.token();
        jwtResponse = jwtResponse.clearTokenValue();

        ResponseCookie cookie = ResponseCookie.from("JWT-TOKEN", jwtToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(jwtResponse);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("JWT-TOKEN", "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/check-auth")
    public ResponseEntity<?> checkAuth(HttpServletRequest request) {
        boolean isAuthenticated = authService.checkAuth(request);

        if (isAuthenticated) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }
}
