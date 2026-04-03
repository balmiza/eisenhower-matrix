package com.squad.api.service;

import com.squad.api.dto.GoalRequest;
import com.squad.api.model.Goal;
import com.squad.api.model.GoalStatus;
import com.squad.api.repository.GoalRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;

    @Transactional
    public Goal createGoal(GoalRequest request, String userId) {
        Goal goal = Goal.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .timeframe(request.getTimeframe())
                .status(request.getStatus() != null ? request.getStatus() : GoalStatus.NOT_STARTED)
                .progress(request.getProgress())
                .dueDate(request.getDueDate())
                .userId(userId)
                .build();
        return goalRepository.save(goal);
    }

    @Transactional(readOnly = true)
    public List<Goal> getAllGoals(String userId) {
        return goalRepository.findAllByUserIdOrderByTimeframe(userId);
    }

    @Transactional
    public Goal updateGoal(UUID id, GoalRequest request, String userId) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found with id: " + id));
        if (!goal.getUserId().equals(userId)) {
            throw new EntityNotFoundException("Goal not found with id: " + id);
        }
        goal.setTitle(request.getTitle());
        goal.setDescription(request.getDescription());
        goal.setCategory(request.getCategory());
        goal.setTimeframe(request.getTimeframe());
        goal.setStatus(request.getStatus() != null ? request.getStatus() : goal.getStatus());
        goal.setProgress(request.getProgress());
        goal.setDueDate(request.getDueDate());
        return goalRepository.save(goal);
    }

    @Transactional
    public void deleteGoal(UUID id, String userId) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found with id: " + id));
        if (!goal.getUserId().equals(userId)) {
            throw new EntityNotFoundException("Goal not found with id: " + id);
        }
        goalRepository.deleteById(id);
    }
}
