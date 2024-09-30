package com.nullpointer.domain.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record AuthUserDTO(@NotNull Long id, @NotEmpty String username) {
}
