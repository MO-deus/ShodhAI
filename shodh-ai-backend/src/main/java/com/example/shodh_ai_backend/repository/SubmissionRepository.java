package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface SubmissionRepository extends JpaRepository<Submission, UUID> {
    List<Submission> findByContestId(UUID contestId);
}
