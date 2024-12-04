package com.nullpointer.domain.answer;

import jakarta.validation.constraints.NotNull;

public record AnswerQuestionDTO(@NotNull Long questionId, String answerText) {
}
