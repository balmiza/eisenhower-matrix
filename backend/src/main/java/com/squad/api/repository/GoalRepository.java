package com.squad.api.repository;

import com.squad.api.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GoalRepository extends JpaRepository<Goal, UUID> {

    @Query("SELECT g FROM Goal g WHERE g.userId = :userId ORDER BY g.timeframe ASC, g.createdAt DESC")
    List<Goal> findAllByUserIdOrderByTimeframe(@Param("userId") String userId);
}
