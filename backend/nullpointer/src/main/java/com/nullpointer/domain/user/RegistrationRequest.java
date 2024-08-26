package com.nullpointer.domain.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class RegistrationRequest {
    @NotEmpty private String username;
    @NotEmpty private String password;
    @NotEmpty private String email;
}
