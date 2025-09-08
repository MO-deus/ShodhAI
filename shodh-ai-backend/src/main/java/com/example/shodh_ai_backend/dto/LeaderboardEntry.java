package com.example.shodh_ai_backend.dto;

import java.util.UUID;

public class LeaderboardEntry {
    private UUID userId;
    private String username;
    private int solvedCount;
    private int totalSubmissions;

    public LeaderboardEntry(UUID userId, String userName, int solvedCount, int totalSubmissions) {
        this.userId = userId;
        this.username = userName;
        this.solvedCount = solvedCount;
        this.totalSubmissions = totalSubmissions;
    }

    // Getters & Setters
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public String getUserName() { return username; }
    public void setUserName(String userName) { this.username = userName; }

    public int getSolvedCount() { return solvedCount; }
    public void setSolvedCount(int solvedCount) { this.solvedCount = solvedCount; }

    public int getTotalSubmissions() { return totalSubmissions; }
    public void setTotalSubmissions(int totalSubmissions) { this.totalSubmissions = totalSubmissions; }
}
