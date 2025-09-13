package com.example.shodh_ai_backend.service;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LeaderboardService {

    private final SubmissionRepository submissionRepository;

    public LeaderboardService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public List<LeaderboardEntry> getLeaderboard(UUID contestId) {
        List<Object[]> results = submissionRepository.getLeaderboard(contestId);

        return results.stream().map(r ->
                new LeaderboardEntry(
                        (UUID) r[0],
                        (String) r[1],
                        ((Number) r[2]).intValue(),
                        ((Number) r[3]).intValue()
                )
        ).collect(Collectors.toList());
    }
}
