package com.nullpointer.domain.user;

public record JwtResponse(String token, Long id, String username) {

    public JwtResponse clearTokenValue() {
        return new JwtResponse(null, id(), username());
    }
}
