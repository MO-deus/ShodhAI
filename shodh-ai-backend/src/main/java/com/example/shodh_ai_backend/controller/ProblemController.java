package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.dto.ProblemDTO;
import com.example.shodh_ai_backend.model.Problem;
import com.example.shodh_ai_backend.repository.ProblemRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {

    private final ProblemRepository problemRepository;

    public ProblemController(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
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

}
