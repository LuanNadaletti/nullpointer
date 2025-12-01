package com.nullpointer.service;

import com.nullpointer.domain.mapper.QuestionMapper;
import com.nullpointer.domain.mapper.UserMapper;
import com.nullpointer.domain.question.AskQuestionDTO;
import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.question.QuestionDTO;
import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.repository.QuestionRepository;
import com.nullpointer.specification.QuestionSpecification;
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

    private final QuestionRepository questionRepository;
    private final QuestionSpecification questionSpecification;
    private final QuestionMapper questionMapper;
    private final UserMapper userMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionSpecification questionSpecification,
                           QuestionMapper questionMapper, UserMapper userMapper) {
        this.questionRepository = questionRepository;
        this.questionSpecification = questionSpecification;
        this.questionMapper = questionMapper;
        this.userMapper = userMapper;
    }

    public QuestionDTO createQuestion(AskQuestionDTO questionDTO, UserDTO userDTO) {
        User user = userMapper.fromDTO(userDTO);
        Question question = questionMapper.fromAskQuestionDTO(questionDTO);
        question.setUser(user);
        question.setCreationDate(new Date());
        question = questionRepository.save(question);

        return questionMapper.fromEntity(question);
    }

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public QuestionDTO findQuestionById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isEmpty()) {
            throw new RuntimeException("Question not found with id: " + id);
        }

        return questionMapper.fromEntity(question.get());
    }

    public List<QuestionDTO> findQuestionsByUserId(Long userId) {
        List<Question> questions = questionRepository.findByUserId(userId);

        return questions.stream()
                .map(questionMapper::fromEntity)
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
        return questionRepository.findAll(spec, pageable).map(questionMapper::fromEntity);
    }
}
