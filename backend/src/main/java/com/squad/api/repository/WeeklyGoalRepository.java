package com.squad.api.repository;

import com.squad.api.model.WeeklyGoal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface WeeklyGoalRepository extends JpaRepository<WeeklyGoal, UUID> {

    List<WeeklyGoal> findAllByUserIdOrderByPriorityAsc(String userId);
}
