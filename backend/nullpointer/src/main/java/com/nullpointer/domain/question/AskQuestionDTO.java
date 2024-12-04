package com.nullpointer.domain.question;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record AskQuestionDTO(@NotEmpty @Size(min = 30) String title, @NotEmpty @Size(min = 100) String questionText) {
}
