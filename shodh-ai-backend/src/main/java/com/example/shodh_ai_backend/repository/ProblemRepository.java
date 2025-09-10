package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.model.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProblemRepository extends JpaRepository<Problem, UUID> {
    List<Problem> findByContestId(UUID contestId);
}
