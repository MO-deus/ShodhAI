package com.example.shodh_ai_backend.dto;

import java.util.UUID;

public class LeaderboardEntry {
    private UUID userId;
    private String username;
    private int solvedCount;
    private int totalSubmissions;

    public LeaderboardEntry(UUID userId, String username, int solvedCount, int totalSubmissions) {
        this.userId = userId;
        this.username = username;
        this.solvedCount = solvedCount;
        this.totalSubmissions = totalSubmissions;
    }

    public UUID getUserId() { return userId; }
    public String getUsername() { return username; }
    public int getSolvedCount() { return solvedCount; }
    public int getTotalSubmissions() { return totalSubmissions; }
}
