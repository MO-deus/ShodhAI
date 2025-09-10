// TestCaseDTO.java
package com.example.shodh_ai_backend.dto;

public class TestCaseDTO {
    private String input;
    private String expectedOutput;

    public TestCaseDTO() {}

    public TestCaseDTO(String input, String expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
    }

    public String getInput() {
        return input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }
}
