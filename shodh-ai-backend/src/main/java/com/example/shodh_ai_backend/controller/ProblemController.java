package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.ProblemDTO;
import com.example.shodh_ai_backend.model.Submission;
import com.example.shodh_ai_backend.repository.SubmissionRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.example.shodh_ai_backend.model.Problem;
import com.example.shodh_ai_backend.repository.ProblemRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.shodh_ai_backend.dto.CodeSubmissionDTO;
import com.example.shodh_ai_backend.dto.TestCaseDTO;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private static final Logger log = LoggerFactory.getLogger(ProblemController.class);
    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;

    public ProblemController(ProblemRepository problemRepository, SubmissionRepository submissionRepository) {
        this.problemRepository = problemRepository;
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/contest/{contestId}")
    public ResponseEntity<List<ProblemDTO>> getProblemsByContest(@PathVariable UUID contestId) {
        List<ProblemDTO> problems = problemRepository.findByContestId(contestId)
                .stream()
                .map(ProblemDTO::new)
                .toList();
        return ResponseEntity.ok(problems);
    }

    @GetMapping("/{problemId}")
    public ResponseEntity<ProblemDTO> getProblemById(@PathVariable UUID problemId) {
        return problemRepository.findById(problemId)
                .map(problem -> ResponseEntity.ok(new ProblemDTO(problem)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{problemId}/submit")
    public ResponseEntity<?> submitSolution(
            @PathVariable UUID problemId,
            @RequestBody CodeSubmissionDTO submissionDTO) {

        return problemRepository.findById(problemId).map(problem -> {
            try {
                // Use test cases from ProblemDTO directly
                List<TestCaseDTO> testCases = new ProblemDTO(problem).getTestCases();
                submissionDTO.setTestCases(testCases);

                // Call Judge API
                String judgeUrl = "https://online-judge-egds.onrender.com/run";
                RestTemplate restTemplate = new RestTemplate();
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);

                HttpEntity<CodeSubmissionDTO> entity = new HttpEntity<>(submissionDTO, headers);
                ResponseEntity<String> response =
                        restTemplate.exchange(judgeUrl, HttpMethod.POST, entity, String.class);

                // Parse judge response
                ObjectMapper mapper = new ObjectMapper();
                Map<String, Object> judgeResponse = mapper.readValue(
                        response.getBody(),
                        new TypeReference<Map<String, Object>>() {}
                );

                // Determine status: Accepted if all test cases passed
                List<Map<String, Object>> testResults = (List<Map<String, Object>>) judgeResponse.get("results");
                boolean allPassed = testResults.stream()
                        .allMatch(r -> Boolean.TRUE.equals(r.get("passed")));
                String status = allPassed ? "Accepted" : "Wrong Answer";

                // Save submission to DB
                Submission submission = new Submission();
                submission.setProblemId(problemId);
                submission.setContestId(submissionDTO.getContestId());
                submission.setUserId(submissionDTO.getUserId());
                submission.setLanguage(submissionDTO.getLanguage());
                submission.setCode(submissionDTO.getCode().replace("\r", ""));
                submission.setStatus(status);
                submission.setOutput(response.getBody());  // save raw judge output
                submission.setSubmittedAt(LocalDateTime.now());

                submissionRepository.save(submission);

                // Return the judge response along with submission status
                Map<String, Object> result = Map.of(
                        "submission", submission,
                        "judgeResponse", judgeResponse
                );

                return ResponseEntity.ok(result);

            } catch (Exception e) {
                return ResponseEntity.status(500)
                        .body(Map.of("error", "Error while submitting code: " + e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }

}
