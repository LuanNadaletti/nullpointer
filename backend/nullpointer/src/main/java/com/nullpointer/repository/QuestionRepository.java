package com.nullpointer.repository;

import com.nullpointer.domain.question.Question;
import com.nullpointer.domain.question.QuestionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.Nullable;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long>, JpaSpecificationExecutor<Question> {

    @Override
    @Query("SELECT q FROM Question q JOIN FETCH q.user u")
    Page<Question> findAll(@Nullable Specification<Question> spec, Pageable pageable);

    List<Question> findByUserId(Long userId);
}
