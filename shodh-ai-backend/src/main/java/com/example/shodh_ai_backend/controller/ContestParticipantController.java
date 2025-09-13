package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.model.ContestParticipant;
import com.example.shodh_ai_backend.repository.ContestParticipantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/contest-participants")
public class ContestParticipantController {

    private final ContestParticipantRepository participantRepository;

    public ContestParticipantController(ContestParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    @PostMapping
    public ResponseEntity<ContestParticipant> joinContest(@RequestBody Map<String, UUID> request) {
        UUID userId = request.get("userId");
        UUID contestId = request.get("contestId");

        return participantRepository.findByUserIdAndContestId(userId, contestId)
                .map(ResponseEntity::ok) // ✅ return existing
                .orElseGet(() -> {
                    ContestParticipant newParticipant = new ContestParticipant();
                    newParticipant.setUserId(userId);
                    newParticipant.setContestId(contestId);
                    return ResponseEntity.ok(participantRepository.save(newParticipant));
                });
    }

}
