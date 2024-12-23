package com.nullpointer.service;

import com.nullpointer.domain.question.AskQuestionDTO;
import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.question.QuestionDTO;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
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
import java.util.stream.Collectors;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionSpecification questionSpecification;

    @Autowired
    private ModelMapper modelMapper;

    public QuestionDTO createQuestion(AskQuestionDTO questionDTO, UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        Question question = modelMapper.map(questionDTO, Question.class);
        question.setUser(user);
        question.setCreationDate(new Date());
        question = questionRepository.save(question);

        return modelMapper.map(question, QuestionDTO.class);
    }

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

    public List<QuestionDTO> findQuestionsByUserId(Long userId) {
        List<Question> questions = questionRepository.findByUserId(userId);

        return questions.stream()
                .map(question -> modelMapper.map(question, QuestionDTO.class))
                .collect(Collectors.toList());
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
}
