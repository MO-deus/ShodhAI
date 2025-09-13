package com.example.shodh_ai_backend.dto;

import com.example.shodh_ai_backend.model.Problem;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public class ProblemDTO {
    private UUID id;
    private String title;
    private String description;
    private String difficulty;
    private List<TestCaseDTO> testCases;
    private Map<String, String> boilerPlateCode; // language -> boilerplate

    public ProblemDTO(Problem problem) {
        this.id = problem.getId();
        this.title = problem.getTitle();
        this.description = problem.getDescription();
        this.difficulty = problem.getDifficulty();

        try {
            ObjectMapper mapper = new ObjectMapper();

            // Parse test cases
            this.testCases = mapper.readValue(
                    problem.getTestCases(),
                    new TypeReference<List<TestCaseDTO>>() {}
            );

            // Parse boilerplate code JSON into Map<String,String>
            this.boilerPlateCode = mapper.readValue(
                    problem.getBoilerPlateCode(),
                    new TypeReference<Map<String, String>>() {}
            );

        } catch (Exception e) {
            this.testCases = List.of(); // fallback
            this.boilerPlateCode = Map.of(); // fallback
        }
    }

    // Getters
    public UUID getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getDifficulty() { return difficulty; }
    public List<TestCaseDTO> getTestCases() { return testCases; }
    public Map<String, String> getBoilerPlateCode() { return boilerPlateCode; }
}
