package com.nullpointer.repository;

import com.nullpointer.domain.user.User;
import com.nullpointer.domain.user.UserStatsDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("SELECT new com.nullpointer.domain.user.UserStatsDTO(" +
            "   (SELECT COUNT(q) FROM Question q WHERE q.user.id = u.id), " +
            "   (SELECT COUNT(a) FROM Answer a WHERE a.user.id = u.id)) " +
            "FROM User u WHERE u.id = :userId")
    UserStatsDTO findUserStatsDTO(@Param("userId") Long userId);
}
