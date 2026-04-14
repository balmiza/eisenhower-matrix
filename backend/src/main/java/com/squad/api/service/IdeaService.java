package com.squad.api.service;

import com.squad.api.dto.IdeaRequest;
import com.squad.api.model.Idea;
import com.squad.api.repository.IdeaRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IdeaService {

    private final IdeaRepository ideaRepository;

    @Transactional
    public Idea create(IdeaRequest request, String userId) {
        Idea idea = Idea.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .userId(userId)
                .build();
        return ideaRepository.save(idea);
    }

    @Transactional(readOnly = true)
    public List<Idea> getAll(String userId) {
        return ideaRepository.findAllByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public Idea update(UUID id, IdeaRequest request, String userId) {
        Idea idea = findOwned(id, userId);
        idea.setTitle(request.getTitle());
        idea.setDescription(request.getDescription());
        return ideaRepository.save(idea);
    }

    @Transactional
    public void delete(UUID id, String userId) {
        findOwned(id, userId);
        ideaRepository.deleteById(id);
    }

    private Idea findOwned(UUID id, String userId) {
        Idea idea = ideaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Idea not found with id: " + id));
        if (!idea.getUserId().equals(userId)) {
            throw new EntityNotFoundException("Idea not found with id: " + id);
        }
        return idea;
    }
}
