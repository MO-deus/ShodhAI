package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.model.ContestParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ContestParticipantRepository extends JpaRepository<ContestParticipant, UUID> {
    Optional<ContestParticipant> findByUserIdAndContestId(UUID userId, UUID contestId);
}
