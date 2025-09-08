package com.example.shodh_ai_backend.repository;

import com.example.shodh_ai_backend.model.Contest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ContestRepository extends JpaRepository<Contest, UUID> {
}
