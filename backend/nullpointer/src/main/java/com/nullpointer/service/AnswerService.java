package com.nullpointer.service;

import com.nullpointer.domain.answer.Answer;
import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.domain.answer.AnswerQuestionDTO;
import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.repository.AnswerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public AnswerDTO answerQuestion(AnswerQuestionDTO answerDTO, UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        Answer answer = modelMapper.map(answerDTO, Answer.class);
        answer.setUser(user);
        answer.setQuestion(new Question(answerDTO.questionId()));
        answer.setCreationDate(new Date());
        answer.setId(null);
        answer = answerRepository.save(answer);

        return modelMapper.map(answer, AnswerDTO.class);
    }
}
