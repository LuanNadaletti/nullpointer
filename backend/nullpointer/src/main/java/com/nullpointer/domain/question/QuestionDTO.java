package com.nullpointer.domain.question;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.domain.user.UserDTO;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class QuestionDTO {

    private Long id;
    private UserDTO user;
    @NotEmpty private String title;
    @NotEmpty private String questionText;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss") private Date creationDate;
    private List<AnswerDTO> answers;
}
