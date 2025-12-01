package com.nullpointer.controller;

import com.nullpointer.config.exception.UserAlreadyExistsException;
import com.nullpointer.domain.user.*;
import com.nullpointer.security.JwtTokenUtil;
import com.nullpointer.service.AuthService;
import com.nullpointer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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

    private final UserService userService;
    private final AuthService authService;
    private final JwtTokenUtil jwtTokenUtil;

    public UserController(UserService userService, AuthService authService, JwtTokenUtil jwtTokenUtil) {
        this.userService = userService;
        this.authService = authService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @GetMapping("{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }

    @GetMapping("/{id}/stats")
    public ResponseEntity<UserStatsDTO> getUserActivityStats(@PathVariable("id") Long id) {
        UserStatsDTO stats = userService.getUserActivityStats(id);
        return ResponseEntity.ok(stats);
    }

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
        String username = jwtTokenUtil.getUsernameFromRequest(request);
        UserDTO userDTO = userService.findByUsername(username);

        if (userDTO != null) {
            return ResponseEntity.ok().body(
                    new AuthUserDTO(userDTO.getId(), userDTO.getUsername())
            );
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable("userId") Long userId, @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(userId, userDTO);
        return ResponseEntity.ok(updatedUser);
    }
}
