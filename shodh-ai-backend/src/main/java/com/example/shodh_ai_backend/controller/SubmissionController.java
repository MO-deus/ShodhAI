package com.example.shodh_ai_backend.controller;

import com.example.shodh_ai_backend.model.Submission;
import com.example.shodh_ai_backend.repository.SubmissionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionRepository submissionRepository;

    public SubmissionController(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @GetMapping("/{submissionId}")
    public ResponseEntity<?> getSubmissionStatus(@PathVariable UUID submissionId) {
        Optional<Submission> submission = submissionRepository.findById(submissionId);
        return submission.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
