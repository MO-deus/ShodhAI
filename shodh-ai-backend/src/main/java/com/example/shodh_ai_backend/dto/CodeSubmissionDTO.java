package com.example.shodh_ai_backend.dto;

import java.util.List;
import java.util.UUID;

public class CodeSubmissionDTO {
    private UUID userId;
    private UUID contestId;
    private String language;
    private String code;
    private List<TestCaseDTO> testCases;

    // getters & setters
    public UUID getUserId() { return userId; }
    public void setUserId(UUID userId) { this.userId = userId; }

    public UUID getContestId() { return contestId; }
    public void setContestId(UUID contestId) { this.contestId = contestId; }

    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public List<TestCaseDTO> getTestCases() { return testCases; }
    public void setTestCases(List<TestCaseDTO> testCases) { this.testCases = testCases; }
}
