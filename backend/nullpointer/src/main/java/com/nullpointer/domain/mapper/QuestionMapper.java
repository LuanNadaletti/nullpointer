package com.nullpointer.domain.mapper;

import com.nullpointer.domain.question.AskQuestionDTO;
import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.question.QuestionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "creationDate", ignore = true)
    @Mapping(target = "answers", ignore = true)
    Question fromAskQuestionDTO(AskQuestionDTO askQuestionDTO);

    QuestionDTO fromEntity(Question question);
}
