package com.nullpointer.domain.mapper;

import com.nullpointer.domain.answer.Answer;
import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.domain.answer.AnswerQuestionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "question", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    Answer fromAnswerQuestionDTO(AnswerQuestionDTO answerQuestionDTO);

    AnswerDTO fromEntity(Answer answer);
}
