package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.service.LeaderboardService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/contests")
public class LeaderboardController {

    private final LeaderboardService leaderboardService;

    public LeaderboardController(LeaderboardService leaderboardService) {
        this.leaderboardService = leaderboardService;
    }

    @GetMapping("/{contestId}/leaderboard")
    public List<LeaderboardEntry> getLeaderboard(@PathVariable UUID contestId) {
        return leaderboardService.getLeaderboard(contestId);
    }
}
