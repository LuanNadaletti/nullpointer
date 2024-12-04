package com.nullpointer.controller;

import com.nullpointer.domain.answer.AnswerDTO;
import com.nullpointer.domain.answer.AnswerQuestionDTO;
import com.nullpointer.domain.user.UserDTO;
import com.nullpointer.security.JwtTokenUtil;
import com.nullpointer.service.AnswerService;
import com.nullpointer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
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

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping
    public ResponseEntity<?> answerQuestion(@RequestBody @Valid AnswerQuestionDTO answerDTO, HttpServletRequest request) {
        String username = jwtTokenUtil.getUsernameFromToken(jwtTokenUtil.extractJwtFromRequest(request));
        UserDTO user = userService.findByUsername(username);
        AnswerDTO answer = answerService.answerQuestion(answerDTO, user);

        return ResponseEntity.ok(answer);
    }
}
