package com.nullpointer.domain.answer;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nullpointer.domain.question.QuestionDTO;
import com.nullpointer.domain.user.UserDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;

@Data
public class AnswerDTO {

    private Long id;
    @NotNull private UserDTO user;
    @NotEmpty private String answerText;
    private @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") Date creationDate;
}
