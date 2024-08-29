package com.nullpointer.domain.question;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nullpointer.domain.user.UserDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class QuestionDTO {
    private long id;
    @NotNull private UserDTO user;
    @NotEmpty private String title;
    @NotEmpty private String questionText;
    @NotNull @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") private Date creationDate;
}
