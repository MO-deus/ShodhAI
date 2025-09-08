package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    @Query(value = """
            SELECT\s
            s.user_id AS userId,
            u.username AS userName,
            COUNT(*) FILTER (WHERE s.status = 'Accepted') AS solvedCount,
            COUNT(*) AS totalSubmissions
            FROM submissions s
            JOIN users u ON s.user_id = u.id
            GROUP BY s.user_id, u.username;
            \s""", nativeQuery = true)
    List<Object[]> getRawLeaderboard(@Param("contestId") UUID contestId);
}
