package com.nullpointer.domain.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    @NotEmpty private String username;
    @NotEmpty private String email;
    @NotNull @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") private Date registrationDate;

    public UserDTO(Long id) {
        this.id = id;
    }
}
