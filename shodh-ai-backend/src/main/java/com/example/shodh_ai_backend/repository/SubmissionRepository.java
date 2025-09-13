package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    @Query(value = """
        SELECT u.id as userId,
               u.username as username,
               COUNT(DISTINCT CASE WHEN s.status = 'Accepted' THEN s.problem_id END) as solvedCount,
               COUNT(s.id) as totalSubmissions
        FROM contest_participants cp
        JOIN users u ON cp.user_id = u.id
        LEFT JOIN submissions s ON s.user_id = cp.user_id AND s.contest_id = cp.contest_id
        WHERE cp.contest_id = :contestId
        GROUP BY u.id, u.username
        ORDER BY solvedCount DESC, totalSubmissions ASC
        """, nativeQuery = true)
    List<Object[]> getLeaderboard(UUID contestId);
}
