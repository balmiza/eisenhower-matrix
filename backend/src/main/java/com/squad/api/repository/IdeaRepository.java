package com.squad.api.repository;

import com.squad.api.model.Idea;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IdeaRepository extends JpaRepository<Idea, UUID> {
    List<Idea> findAllByUserIdOrderByCreatedAtDesc(String userId);
}
