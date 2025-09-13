package com.example.shodh_ai_backend.model;

import jakarta.persistence.*;
import java.util.UUID;
import java.time.LocalDateTime;
import org.hibernate.annotations.Type;

@Entity
@Table(name = "problems")
public class Problem {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @Column(name = "test_cases", columnDefinition = "TEXT")
    private String testCases;

    @Column(name = "boiler_plate_code", columnDefinition = "TEXT")
    private String boilerPlateCode;

    // Relationship to contests
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id", nullable = false)
    private Contest contest;

    // Getters and Setters
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }

    public String getTestCases() { return testCases; }

    public void setTestCases(String testCases) { this.testCases = testCases; }

    public String getBoilerPlateCode() {
        return boilerPlateCode;
    }

    public void setBoilerPlateCode(String boilerPlateCode) {
        this.boilerPlateCode = boilerPlateCode;
    }
}
