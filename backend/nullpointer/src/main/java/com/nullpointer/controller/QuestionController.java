package com.nullpointer.controller;

import com.nullpointer.domain.question.AskQuestionDTO;
import com.nullpointer.domain.question.QuestionDTO;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.security.JwtTokenUtil;
import com.nullpointer.service.QuestionService;
import com.nullpointer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("questions")
public class QuestionController {

    private final QuestionService questionService;
    private final UserService userService;
    private final JwtTokenUtil jwtTokenUtil;

    public QuestionController(QuestionService questionService, UserService userService, JwtTokenUtil jwtTokenUtil) {
        this.questionService = questionService;
        this.userService = userService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping
    public ResponseEntity<?> createQuestion(@RequestBody @Valid AskQuestionDTO askQuestionDTO, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenUtil.extractJwtFromRequest(request));
        UserDTO user = userService.findByUsername(username);
        QuestionDTO question = questionService.createQuestion(askQuestionDTO, user);

        return ResponseEntity.ok(question);
    }

    @GetMapping
    public Page<QuestionDTO> getQuestionsWithPagination(
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
    public ResponseEntity<QuestionDTO> getQuestionById(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.findQuestionById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QuestionDTO>> getQuestionsByUser(@PathVariable Long userId) {
        List<QuestionDTO> questions = questionService.findQuestionsByUserId(userId);
        if (questions.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(questions);
    }
}
