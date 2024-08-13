package com.nullpointer.service;

import com.nullpointer.model.Question;
import com.nullpointer.repository.QuestionRepository;
import com.nullpointer.specification.QuestionSpecification;
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

    public List<Question> findAllQuestions() {
        return questionRepository.findAll();
    }

    public Question findQuestionById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        return question.orElseThrow(() -> new RuntimeException("Question not found with id: " + id));
    }

    public Page<Question> findQuestionsWithPagination(
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
        return questionRepository.findAll(spec, pageable);
    }

    public long count() {
        return questionRepository.count();
    }
}
