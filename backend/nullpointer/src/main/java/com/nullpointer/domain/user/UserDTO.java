package com.nullpointer.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    private Long id;
    @NotEmpty private String username;
    @NotEmpty private String email;
    @NotNull @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") private Date registrationDate;
}
