package com.nullpointer.controller;

import com.nullpointer.model.Question;
import com.nullpointer.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public Page<Question> getQuestions(
            @RequestParam Optional<String> title,
            @RequestParam Optional<String> author,
            @RequestParam Optional<Date> fromDate,
            @RequestParam Optional<Date> toDate,
            @RequestParam Optional<String> sortBy,
            @RequestParam Optional<Boolean> ascending,
            @RequestParam int page,
            @RequestParam int size
    ) {
        return questionService.findQuestionsWithPagination(
                title, author, fromDate, toDate, sortBy, ascending, page, size);
    }

    @GetMapping("/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.findQuestionById(id);
    }
}
