package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.repository.SubmissionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/contests")
public class LeaderboardController {

    private final SubmissionRepository submissionRepository;

    public LeaderboardController(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/{contestId}/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(@PathVariable UUID contestId) {
        List<Object[]> rawData = submissionRepository.getRawLeaderboard(contestId);

        List<LeaderboardEntry> leaderboard = new ArrayList<>();

        for (Object[] row : rawData) {
            UUID userId = (UUID) row[0];
            String userName = (String) row[1];
            int solvedCount = ((Number) row[2]).intValue();
            int totalSubmissions = ((Number) row[3]).intValue();

            leaderboard.add(new LeaderboardEntry(userId, userName, solvedCount, totalSubmissions));
        }

        return ResponseEntity.ok(leaderboard);
    }
}
