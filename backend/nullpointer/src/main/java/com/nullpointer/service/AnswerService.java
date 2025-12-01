package com.nullpointer.service;

import com.nullpointer.domain.answer.Answer;
import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.domain.answer.AnswerQuestionDTO;
import com.nullpointer.domain.mapper.AnswerMapper;
import com.nullpointer.domain.mapper.UserMapper;
import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.repository.AnswerRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerMapper answerMapper;
    private final UserMapper userMapper;

    public AnswerService(AnswerRepository answerRepository, AnswerMapper answerMapper, UserMapper userMapper) {
        this.answerRepository = answerRepository;
        this.answerMapper = answerMapper;
        this.userMapper = userMapper;
    }

    public AnswerDTO answerQuestion(AnswerQuestionDTO answerDTO, UserDTO userDTO) {
        User user = userMapper.fromDTO(userDTO);
        Answer answer = answerMapper.fromAnswerQuestionDTO(answerDTO);
        answer.setUser(user);
        answer.setQuestion(new Question(answerDTO.questionId()));
        answer.setCreationDate(new Date());
        answer.setId(null);
        answer = answerRepository.save(answer);

        return answerMapper.fromEntity(answer);
    }
}
