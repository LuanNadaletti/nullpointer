package com.nullpointer.domain.user;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserStatsDTO {

    private Long questionsCount;
    private Long answersCount;

    public UserStatsDTO(Long questionsCount, Long answersCount) {
        this.questionsCount = questionsCount;
        this.answersCount = answersCount;
    }
}
