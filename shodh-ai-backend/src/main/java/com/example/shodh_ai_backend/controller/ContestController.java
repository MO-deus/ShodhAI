package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.model.Contest;
import com.example.shodh_ai_backend.repository.ContestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/contests")
public class ContestController {

    private final ContestRepository contestRepository;

    public ContestController(ContestRepository contestRepository) {
        this.contestRepository = contestRepository;
    }

    // GET /api/contests/{contestId}
    @GetMapping("/{contestId}")
    public ResponseEntity<?> getContestById(@PathVariable UUID contestId) {
        Optional<Contest> contest = contestRepository.findById(contestId);
        return contest.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
