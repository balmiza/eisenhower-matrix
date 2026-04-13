package com.squad.api.service;

import com.squad.api.dto.WeeklyGoalRequest;
import com.squad.api.model.WeeklyGoal;
import com.squad.api.model.WeeklyGoalStatus;
import com.squad.api.repository.WeeklyGoalRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WeeklyGoalService {

    private final WeeklyGoalRepository weeklyGoalRepository;

    @Transactional
    public WeeklyGoal create(WeeklyGoalRequest request, String userId) {
        WeeklyGoal goal = WeeklyGoal.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .userId(userId)
                .build();
        return weeklyGoalRepository.save(goal);
    }

    @Transactional(readOnly = true)
    public List<WeeklyGoal> getAll(String userId) {
        return weeklyGoalRepository.findAllByUserIdOrderByPriorityAsc(userId);
    }

    @Transactional
    public WeeklyGoal update(UUID id, WeeklyGoalRequest request, String userId) {
        WeeklyGoal goal = findOwned(id, userId);
        goal.setTitle(request.getTitle());
        goal.setDescription(request.getDescription());
        goal.setPriority(request.getPriority());
        return weeklyGoalRepository.save(goal);
    }

    @Transactional
    public WeeklyGoal complete(UUID id, String userId) {
        WeeklyGoal goal = findOwned(id, userId);
        goal.setStatus(WeeklyGoalStatus.DONE);
        return weeklyGoalRepository.save(goal);
    }

    @Transactional
    public void delete(UUID id, String userId) {
        findOwned(id, userId);
        weeklyGoalRepository.deleteById(id);
    }

    private WeeklyGoal findOwned(UUID id, String userId) {
        WeeklyGoal goal = weeklyGoalRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Weekly goal not found with id: " + id));
        if (!goal.getUserId().equals(userId)) {
            throw new EntityNotFoundException("Weekly goal not found with id: " + id);
        }
        return goal;
    }
}
