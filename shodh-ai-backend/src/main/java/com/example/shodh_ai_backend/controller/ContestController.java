package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.LeaderboardEntry;
import com.example.shodh_ai_backend.model.Contest;
import com.example.shodh_ai_backend.model.Submission;
import com.example.shodh_ai_backend.model.User;
import com.example.shodh_ai_backend.repository.ContestRepository;
import com.example.shodh_ai_backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.shodh_ai_backend.repository.SubmissionRepository;


import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/contests")
public class ContestController {

    private final ContestRepository contestRepository;
    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    public ContestController(ContestRepository contestRepository, SubmissionRepository submissionRepository, UserRepository userRepository) {
        this.contestRepository = contestRepository;
        this.submissionRepository = submissionRepository;
        this.userRepository = userRepository;
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
    @GetMapping("/{contestId}/leaderboard")
    public ResponseEntity<List<LeaderboardEntry>> getLeaderboard(@PathVariable UUID contestId) {
        // 1. Fetch all submissions for this contest
        List<Submission> submissions = submissionRepository.findByContestId(contestId);

        // 2. Map userId -> problems solved (set) and total submissions
        Map<UUID, Set<UUID>> userSolved = new HashMap<>();
        Map<UUID, Integer> userSubmissionsCount = new HashMap<>();

        for (Submission s : submissions) {
            userSubmissionsCount.put(
                    s.getUserId(),
                    userSubmissionsCount.getOrDefault(s.getUserId(), 0) + 1
            );

            if ("Accepted".equals(s.getStatus())) {
                userSolved.computeIfAbsent(s.getUserId(), k -> new HashSet<>()).add(s.getProblemId());
            }
        }

        // 3. Fetch all relevant users at once to avoid N+1 query problem
        List<UUID> userIds = new ArrayList<>(userSolved.keySet());
        List<User> users = userRepository.findAllById(userIds);
        Map<UUID, String> userIdToName = users.stream()
                .collect(Collectors.toMap(User::getId, User::getUsername));

        // 4. Build leaderboard entries
        List<LeaderboardEntry> leaderboard = userSolved.entrySet().stream()
                .map(entry -> new LeaderboardEntry(
                        entry.getKey(),
                        userIdToName.getOrDefault(entry.getKey(), "Unknown User"),
                        entry.getValue().size(),
                        userSubmissionsCount.getOrDefault(entry.getKey(), 0)
                ))
                .sorted(Comparator.comparingInt(LeaderboardEntry::getSolvedCount).reversed())
                .toList();

        return ResponseEntity.ok(leaderboard);

    }
}
