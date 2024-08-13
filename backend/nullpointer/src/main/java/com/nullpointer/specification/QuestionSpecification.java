package com.nullpointer.specification;

import com.nullpointer.model.Question;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Component
public class QuestionSpecification {

    public Specification<Question> filterByCriteria(
            Optional<String> title,
            Optional<String> author,
            Optional<Date> fromDate,
            Optional<Date> toDate
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            title.ifPresent(t -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + t.toLowerCase() + "%")));

            author.ifPresent(a -> predicates.add(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("author")), "%" + a.toLowerCase() + "%")));

            fromDate.ifPresent(fd -> predicates.add(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("creationDate"), fd)));

            toDate.ifPresent(td -> predicates.add(
                    criteriaBuilder.lessThanOrEqualTo(root.get("creationDate"), td)));

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}
