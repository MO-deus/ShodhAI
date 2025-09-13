// TestCaseDTO.java
package com.example.shodh_ai_backend.dto;

public class TestCaseDTO {
    private String input;
    private String expectedOutput;

    public TestCaseDTO() {}

    public TestCaseDTO(String input, String expectedOutput) {
        this.input = input;
        this.expectedOutput = expectedOutput;
        System.out.println(input);
        System.out.println(input);
    }

    public String getInput() {
        return input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public void setInput(String input) { this.input = input; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

}
