package com.squad.api.controller;

import com.squad.api.dto.IdeaRequest;
import com.squad.api.model.Idea;
import com.squad.api.service.IdeaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/ideas")
@RequiredArgsConstructor
public class IdeaController {

    private final IdeaService ideaService;

    @PostMapping
    public ResponseEntity<Idea> create(@Valid @RequestBody IdeaRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.status(HttpStatus.CREATED).body(ideaService.create(request, userId));
    }

    @GetMapping
    public ResponseEntity<List<Idea>> getAll() {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(ideaService.getAll(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Idea> update(@PathVariable UUID id, @Valid @RequestBody IdeaRequest request) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(ideaService.update(id, request, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        ideaService.delete(id, userId);
        return ResponseEntity.noContent().build();
    }
}
