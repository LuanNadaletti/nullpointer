package com.nullpointer.service;

import com.nullpointer.domain.user.JwtRequest;
import com.nullpointer.domain.user.JwtResponse;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.security.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public JwtResponse authenticateUser(JwtRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.username());

        final String token = jwtTokenUtil.generateToken(userDetails);

        UserDTO user = userService.findByUsername(userDetails.getUsername());

        return new JwtResponse(
                token,
                user.getId(),
                user.getUsername()
        );
    }

    public boolean checkAuth(HttpServletRequest request) {
        String token = jwtTokenUtil.extractJwtFromRequest(request);
        if (token == null) {
            return false;
        }

        String username = jwtTokenUtil.getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        return jwtTokenUtil.validateToken(token, userDetails);
    }
}
