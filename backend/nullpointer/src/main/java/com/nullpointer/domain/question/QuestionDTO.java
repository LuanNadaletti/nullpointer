package com.nullpointer.domain.question;

import com.nullpointer.domain.user.UserDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class QuestionDTO {
    @NotNull private long id;
    @NotNull private UserDTO user;
    @NotEmpty private String title;
    @NotEmpty private String questionText;
    @NotNull private Date creationDate;
}
