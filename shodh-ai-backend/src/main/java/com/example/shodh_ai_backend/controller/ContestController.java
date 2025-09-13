package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.model.Contest;
import com.example.shodh_ai_backend.model.Submission;
import com.example.shodh_ai_backend.repository.ContestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

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

    // GET /api/contests
    @GetMapping
    public ResponseEntity<List<Contest>> getAllContests() {
        List<Contest> contests = contestRepository.findAll();
        return ResponseEntity.ok(contests);
    }
    
}
