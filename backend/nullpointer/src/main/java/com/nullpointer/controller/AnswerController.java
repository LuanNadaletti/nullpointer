package com.nullpointer.controller;

import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.service.AnswerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @PostMapping
    public ResponseEntity<?> answerQuestion(@RequestBody @Valid AnswerDTO answerDTO) {
        AnswerDTO savedAnswer = answerService.answerQuestion(answerDTO);
        return ResponseEntity.ok(savedAnswer);
    }
}
