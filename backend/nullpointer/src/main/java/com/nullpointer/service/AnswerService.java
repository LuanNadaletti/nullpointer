package com.nullpointer.service;

import com.nullpointer.domain.answer.Answer;
import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.repository.AnswerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private ModelMapper modelMapper;

    public AnswerDTO answerQuestion(AnswerDTO answerDTO) {
        Answer answer = modelMapper.map(answerDTO, Answer.class);
        answer = answerRepository.save(answer);
        return modelMapper.map(answer, AnswerDTO.class);
    }
}
