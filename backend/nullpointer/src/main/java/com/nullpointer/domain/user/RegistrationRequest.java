package com.nullpointer.domain.user;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {
    @NotEmpty private String username;
    @NotEmpty private String password;
    @NotEmpty private String email;
}
