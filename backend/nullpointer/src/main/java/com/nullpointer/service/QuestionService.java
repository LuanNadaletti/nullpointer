package com.nullpointer.service;

import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.question.QuestionDTO;
import com.nullpointer.repository.QuestionRepository;
import com.nullpointer.specification.QuestionSpecification;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionSpecification questionSpecification;

    @Autowired
    private ModelMapper modelMapper;

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public QuestionDTO findQuestionById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isEmpty()) {
            throw new RuntimeException("Question not found with id: " + id);
        }

        return modelMapper.map(question.get(), QuestionDTO.class);
    }

    public Page<QuestionDTO> findQuestionsWithPagination(
            Optional<String> title,
            Optional<String> author,
            Optional<Date> fromDate,
            Optional<Date> toDate,
            Optional<String> sortBy,
            Optional<Boolean> ascending,
            int page,
            int size
    ) {
        Specification<Question> spec = questionSpecification.filterByCriteria(
                title, author, fromDate, toDate);

        Sort sort = Sort.by(sortBy.orElse("creationDate"));
        if (ascending.isPresent() && !ascending.get()) {
            sort = sort.descending();
        }

        Pageable pageable = PageRequest.of(page, size, sort);
        return questionRepository.findAll(spec, pageable).map(question -> modelMapper.map(question, QuestionDTO.class));
    }

    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = modelMapper.map(questionDTO, Question.class);
        question = questionRepository.save(question);
        return modelMapper.map(question, QuestionDTO.class);
    }
}
