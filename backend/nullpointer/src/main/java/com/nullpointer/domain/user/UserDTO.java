package com.nullpointer.domain.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    @NotEmpty private String username;
    @NotEmpty private String email;
    @NotNull private Date registrationDate;
}
